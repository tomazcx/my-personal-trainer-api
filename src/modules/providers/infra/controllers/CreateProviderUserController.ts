import {CreateProviderUserService} from "@modules/providers/services/CreateProviderUserService";
import {Request, Response} from "express";
import {container} from "tsyringe";

export class CreateProviderUserController {

	public async handle(req: Request, res: Response): Promise<Response> {

		const {name, email, category_id, password} = req.body

		const service = container.resolve(CreateProviderUserService)

		const user = await service.execute({name, email, password, category_id})

		return res.status(201).json(user)
	}

}
