import {injectable, inject} from 'tsyringe';
import {getHours, isAfter} from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IUsersRepository from 'src/modules/users/repositories/IUsersRepository';
import AppError from 'src/shared/errors/AppError';

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

		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	public async execute({
		provider_id,
		day,
		year,
		month,
	}: IRequest): Promise<IResponse> {

		const providerExists = await this.usersRepository.findById(provider_id)

		if (!providerExists) {
			throw new AppError('Personal trainer not found', 404)
		}

		const isProvider = await this.usersRepository.verifyIsProvider(provider_id)

		if (!isProvider) {
			throw new AppError("This user is not a personal trainer")
		}


		const appointments = await this.appointmentsRepositiry.findAllInDayFromProvider(
			{
				provider_id,
				day,
				year,
				month,
			},
		);

		const hourStart = 8;

		const eachHourArray = Array.from(
			{length: 10},
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

