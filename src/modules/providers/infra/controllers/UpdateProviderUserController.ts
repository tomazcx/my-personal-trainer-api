import {UpdateProviderUserService} from '@modules/providers/services/UpdateProviderUserService'
import {Request, Response} from 'express'
import {container} from 'tsyringe'

export class UpdateProviderUserController {

	public async handle(req: Request, res: Response): Promise<Response> {

		const {description, startHour, endHour, category_id} = req.body
		const id = req.user.id

		const service = container.resolve(UpdateProviderUserService)

		await service.execute({description, startHour, endHour, category_id, id})

		return res.status(200).json()
	}

}
