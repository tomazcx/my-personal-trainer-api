import {Appointment} from '@prisma/client';
import {startOfHour, isBefore, getHours, format} from 'date-fns';
import INotificationsRepository from 'src/modules/notifications/repositories/INotificationRepository';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import ICacheProvider from 'src/shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from 'src/shared/errors/AppError';
import {injectable, inject} from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

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

		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider,
	) {}

	public async execute({
		provider_id,
		user_id,
		date,
	}: IRequest): Promise<Appointment> {
		const appointmentDate = startOfHour(date);

		const providerExists = await this.usersRepository.findById(provider_id)

		if (!providerExists) {
			throw new AppError("This personal trainer does not exist.", 404)
		}

		const isProvider = await this.usersRepository.verifyIsProvider(provider_id)

		if (!isProvider) {
			throw new AppError("You can't create an appointment with a user that is not a personal trainer.")
		}

		if (isBefore(appointmentDate, Date.now())) {
			throw new AppError("You can't create an appointment on a past date.");
		}

		if (user_id === provider_id) {
			throw new AppError("You can't create an appointment with yourself.");
		}

		if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
			throw new AppError(
				'You can only create appointment between 8am and 5pm.',
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

		return appointment;
	}
}

export default CreateAppointmentService;
