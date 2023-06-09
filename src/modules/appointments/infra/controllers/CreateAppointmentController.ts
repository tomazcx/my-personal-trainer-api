import {Request, Response} from 'express';

import {container} from 'tsyringe';
import CreateAppointmentService from '../../services/CreateAppointmentService';

export default class CreateAppointmentController {
	public async create(req: Request, res: Response): Promise<Response> {
		const user_id = req.user.id;
		const {provider_id, date} = req.body;

		const createAppointment = container.resolve(CreateAppointmentService);

		const appointment = await createAppointment.execute({
			provider_id,
			user_id,
			date,
		});

		return res.status(201).json(appointment);
	}
}
