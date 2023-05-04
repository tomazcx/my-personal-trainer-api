import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import {Appointment} from "@prisma/client";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import AppError from "@shared/errors/AppError";
import {isAfter, parseISO, subHours} from "date-fns";
import {inject, injectable} from "tsyringe";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface IRequest {
	id: string;
}

@injectable()
export class ListClientAppointmentsService {


	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepositiry: IAppointmentsRepository,

		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
	) {}

	public async execute({id}: IRequest): Promise<Appointment[]> {
		const userExists = this.usersRepository.findById(id)

		if (!userExists) {
			throw new AppError('User not found', 404)
		}

		const cacheKey = `user-appointments:${id}`;

		let appointments = await this.cacheProvider.recover<Appointment[]>(
			cacheKey,
		);

		if (!appointments) {
			appointments = await this.appointmentsRepositiry.findAllClientAppointments(id);

			await this.cacheProvider.save(cacheKey, appointments);
		}

		const formatedAppointments = appointments.filter(app => {

			let date = app.date

			if (typeof date === 'string') {
				date = parseISO(date)
			}

			if (isAfter(date, subHours(Date.now(), 3))) {
				return app
			}
		})


		return formatedAppointments;

	}

}
