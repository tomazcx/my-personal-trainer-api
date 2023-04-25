import {injectable, inject} from 'tsyringe';
import {getDaysInMonth, getDate, isAfter} from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
	provider_id: string;
	year: number;
	month: number;
}

type IResponse = Array<{
	day: number;
	available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('AppointmentsRepository')
		private appointmentsRepositiry: IAppointmentsRepository,
	) {}

	public async execute({
		provider_id,
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

		const appointments = await this.appointmentsRepositiry.findAllInMonthFromProvider(
			{
				provider_id,
				year,
				month,
			},
		);

		const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

		const eachDayArray = Array.from(
			{length: numberOfDaysInMonth},
			(_, index) => index + 1,
		);

		const availability = eachDayArray.map(day => {
			const compareDate = new Date(year, month - 1, day, 23, 59, 59);

			const appointmentsInDay = appointments.filter(appointment => {
				return getDate(appointment.date) === day;
			});

			return {
				day,
				available:
					isAfter(compareDate, new Date()) && appointmentsInDay.length < 10,
			};
		});

		return availability;
	}
}

export default ListProviderMonthAvailabilityService;
