import {Appointment} from '@prisma/client';
import {startOfHour, isBefore, getHours, format, subHours} from 'date-fns';
import INotificationsRepository from '@modules/notifications/repositories/INotificationRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import {injectable, inject} from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import {IProvidersRepository} from '@modules/providers/repositories/IProvidersRepository';

interface IRequest {
	provider_id: string;
	user_id: string;
	date: Date;
}

@injectable()
class CreateAppointmentService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository,

		@inject('NotificationsRepository')
		private notificationsRepository: INotificationsRepository,

		@inject('ProvidersRepository')
		private providersRepository: IProvidersRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider,
	) {}

	public async execute({
		provider_id,
		user_id,
		date,
	}: IRequest): Promise<Appointment> {
		const appointmentDate = startOfHour(date);

		const providerExists = await this.providersRepository.exists(provider_id)

		if (!providerExists) {
			throw new AppError("This personal trainer does not exist.", 404)
		}

		const provider = await this.providersRepository.findById(provider_id)

		const startHour = provider!.ProviderInfo.startHour || 8
		const endHour = provider!.ProviderInfo.endHour || 18

		const isProvider = await this.providersRepository.verifyIsProvider(provider_id)

		if (!isProvider) {
			throw new AppError("You can't create an appointment with a user that is not a personal trainer.")
		}

		if (isBefore(appointmentDate, subHours(Date.now(), 3))) {
			throw new AppError("You can't create an appointment on a past date.");
		}

		if (user_id === provider_id) {
			throw new AppError("You can't create an appointment with yourself.");
		}

		if (getHours(appointmentDate) < startHour || getHours(appointmentDate) > endHour) {
			throw new AppError(
				`You can only create appointment between ${startHour < 10 ? `0${startHour}` : startHour}:00 and ${endHour < 10 ? `0${endHour}` : endHour}:00.`
			);
		}

		const isSameDate = await this.appointmentsRepository.findByDate(
			appointmentDate,
			provider_id,
		);

		if (isSameDate) {
			throw new AppError('This appointment is already booked');
		}


		const appointment = await this.appointmentsRepository.create({
			provider_id,
			user_id,
			date: appointmentDate,
		});

		const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

		await this.notificationsRepository.create({
			recipient_id: provider_id,
			content: `Novo agendamento para o dia ${dateFormatted}`,
		});

		await this.cacheProvider.invalidate(
			`providers-appointments:${provider_id}:${format(
				appointmentDate,
				'yyyy-M-d',
			)}`
		);

		await this.cacheProvider.invalidate(`user-appointments:${user_id}`);

		return appointment;
	}
}

export default CreateAppointmentService;
