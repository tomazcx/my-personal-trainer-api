import {Request, Response} from 'express';
import {container} from 'tsyringe';
import ListProviderAppointmentsService from '../../services/ListProviderAppointmentsService';

export default class ListProviderAppointmentsController {
	public async index(req: Request, res: Response): Promise<Response> {
		const provider_id = req.user.id;
		const {day, month, year} = req.query;

		const listProviderAppointments = container.resolve(
			ListProviderAppointmentsService,
		);

		const appointments = await listProviderAppointments.execute({
			provider_id,
			day: Number(day),
			month: Number(month),
			year: Number(year),
		});

		return res.json(appointments);
	}
}

