import {ShowProvidersByCategoryService} from "@modules/providers/services/ShowProvidersByCategoryService";
import {container} from "tsyringe";
import {Request, Response} from "express";

export class ShowProvidersByCategoryController {

	public async handle(req: Request, res: Response): Promise<Response> {

		const {category_id} = req.params

		const service = container.resolve(ShowProvidersByCategoryService)

		const providers = await service.execute(category_id)

		return res.status(200).json(providers)

	}

}
