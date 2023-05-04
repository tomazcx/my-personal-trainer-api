import {Appointment, Prisma, PrismaClient} from "@prisma/client";
import {prismaClient} from "@shared/infra/db/prisma";
import ICreateAppointmentDTO from "../../dto/ICreateAppointmentDTO";
import IFindAllInDayFromProviderDTO from "../../dto/IFindAllInDayFromProviderDTO";
import IFindAllInMonthFromProviderDTO from "../../dto/IFindAllInMonthFromProviderDTO";
import IAppointmentsRepository from "../IAppointmentsRepository";

class AppointmentsRepository implements IAppointmentsRepository {
	private ormRepository: PrismaClient['appointment'];

	constructor() {
		this.ormRepository = prismaClient.appointment;
	}

	public async findByDate(
		date: Date,
		provider_id: string,
	): Promise<Appointment | null> {
		const findAppointment = await this.ormRepository.findFirst({
			where: {date, provider_id},
		});

		return findAppointment;
	}

	public async findAllInMonthFromProvider({
		provider_id,
		month,
		year,
	}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
		const parsedMonth = String(month).padStart(2, '0');

		const appointments = await this.ormRepository.findMany({
			where: {
				provider_id,
				date: {
					equals: new Date(`${year}-${parsedMonth}`),
				}
			},
			include: {
				providedBy: true,
				scheduledBy: true
			}

		});

		return appointments;
	}

	public async findAllInDayFromProvider({
		provider_id,
		day,
		month,
		year,
	}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {

		const startDate = new Date(year, month - 1, day);
		const endDate = new Date(year, month - 1, day + 1);

		const appointments = await this.ormRepository.findMany({
			where: {
				provider_id,
				date: {
					gte: startDate,
					lt: endDate,
				}
			},
			include: {
				providedBy: true,
				scheduledBy: true
			}
		});

		return appointments;
	}

	public async findAllClientAppointments(id: string): Promise<Appointment[]> {
		const appointments = await this.ormRepository.findMany({
			where: {
				user_id: id
			},
			include: {
				providedBy: true,
				scheduledBy: true
			}
		})

		return appointments
	}

	public async create({
		provider_id,
		user_id,
		date,
	}: ICreateAppointmentDTO): Promise<Appointment> {
		const appointment = this.ormRepository.create({
			data: {
				provider_id,
				user_id,
				date,
			}
		});

		return appointment;
	}
}

export default AppointmentsRepository;

