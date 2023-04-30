import {ListCategoriesService} from '@modules/providers/services/ListCategoriesService'
import {Request, Response} from 'express'
import {container} from 'tsyringe'

export class ListCategoriesController {

	public async handle(req: Request, res: Response): Promise<Response> {
		const service = container.resolve(ListCategoriesService)

		const categories = await service.execute()

		return res.status(200).json(categories)
	}

}
