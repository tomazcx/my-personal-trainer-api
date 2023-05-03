import {Appointment} from '@prisma/client';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import {injectable, inject} from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import {ProvidersRepository} from '@modules/providers/repositories/implementation/ProvidersRepository';
import {subHours} from 'date-fns';

interface IRequest {
	provider_id: string;
	day: number;
	year: number;
	month: number;
}

@injectable()
class ListProviderAppointmentsService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepositiry: IAppointmentsRepository,

		@inject('ProvidersRepository')
		private providersRepository: ProvidersRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider,
	) {}

	public async execute({
		provider_id,
		day,
		year,
		month,
	}: IRequest): Promise<Appointment[]> {

		const isProvider = await this.providersRepository.verifyIsProvider(provider_id)

		if (!isProvider) {
			throw new AppError('You are not a personal trainer.')
		}

		const cacheKey = `providers-appointments:${provider_id}:${year}-${month}-${day}`;

		let appointments = await this.cacheProvider.recover<Appointment[]>(
			cacheKey,
		);

		if (!appointments) {
			appointments = await this.appointmentsRepositiry.findAllInDayFromProvider(
				{
					provider_id,
					day,
					year,
					month,
				},
			);

			await this.cacheProvider.save(cacheKey, appointments);
		}

		return appointments;
	}
}

export default ListProviderAppointmentsService;
