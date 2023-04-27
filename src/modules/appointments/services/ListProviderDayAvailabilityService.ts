import {injectable, inject} from 'tsyringe';
import {getHours, isAfter} from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import {IProvidersRepository} from '@modules/providers/repositories/IProvidersRepository';

interface IRequest {
	provider_id: string;
	day: number;
	year: number;
	month: number;
}

type IResponse = Array<{
	hour: number;
	available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepositiry: IAppointmentsRepository,

		@inject('ProvidersRepository')
		private providersRepository: IProvidersRepository
	) {}

	public async execute({
		provider_id,
		day,
		year,
		month,
	}: IRequest): Promise<IResponse> {

		const providerExists = await this.providersRepository.findById(provider_id)

		if (!providerExists) {
			throw new AppError('Personal trainer not found', 404)
		}

		const isProvider = await this.providersRepository.verifyIsProvider(provider_id)

		if (!isProvider) {
			throw new AppError("This user is not a personal trainer")
		}

		const provider = await this.providersRepository.findById(provider_id)

		const appointments = await this.appointmentsRepositiry.findAllInDayFromProvider(
			{
				provider_id,
				day,
				year,
				month,
			},
		);

		const hourStart: number = provider?.provider_info.startHour ?? 8;
		const hourEnd: number = provider?.provider_info.endHour ?? 17

		const eachHourArray = Array.from(
			{length: hourEnd - hourStart},
			(_, index) => index + hourStart,
		);

		const currentDate = new Date(Date.now());

		const availability = eachHourArray.map(hour => {
			const hasAppointmentInHour = appointments.find(
				appointment => getHours(appointment.date) === hour,
			);

			const compareDate = new Date(year, month - 1, day, hour);

			return {
				hour,
				available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
			};
		});

		return availability;
	}
}

export default ListProviderDayAvailabilityService;

