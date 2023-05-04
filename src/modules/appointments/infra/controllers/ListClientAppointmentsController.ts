import {ListClientAppointmentsService} from "@modules/appointments/services/ListClientAppointmentsService";
import {container} from "tsyringe";
import {Request, Response} from 'express'

export class ListClientAppointmentsController {

	public async handle(req: Request, res: Response): Promise<Response> {

		const id = req.user.id

		const service = container.resolve(ListClientAppointmentsService)

		const appointments = await service.execute({id})

		return res.status(200).json(appointments)
	}

}
