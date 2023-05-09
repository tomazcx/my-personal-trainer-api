import {injectable, inject} from 'tsyringe';
import {getHours, isAfter, subHours} from 'date-fns';
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

		const hourStart = 6;
		const startWorkingHour: number = provider?.ProviderInfo.startHour ?? 8
		const endWorkingHour: number = provider?.ProviderInfo.endHour ?? 18

		const eachHourArray = Array.from(
			{length: 16},
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
				available: !hasAppointmentInHour && isAfter(compareDate, subHours(currentDate, 3)) && (hour >= startWorkingHour && hour <= endWorkingHour),
			};
		});

		return availability;
	}
}

export default ListProviderDayAvailabilityService;

