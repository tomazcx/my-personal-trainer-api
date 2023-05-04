import {Appointment} from '@prisma/client';
import ICreateAppointmentDTO from '../dto/ICreateAppointmentDTO';
import IFindAllInDayFromProviderDTO from '../dto/IFindAllInDayFromProviderDTO';
import IFindAllInMonthFromProviderDTO from '../dto/IFindAllInMonthFromProviderDTO';

export default interface IAppointmentsRepository {
	create(data: ICreateAppointmentDTO): Promise<Appointment>;
	findByDate(date: Date, provider_id: string): Promise<Appointment | null>;
	findAllInMonthFromProvider(
		data: IFindAllInMonthFromProviderDTO,
	): Promise<Appointment[]>;
	findAllInDayFromProvider(
		data: IFindAllInDayFromProviderDTO,
	): Promise<Appointment[]>;
	findAllClientAppointments(id: string): Promise<Appointment[]>
}

