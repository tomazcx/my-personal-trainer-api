import {container} from "tsyringe";
import {CreateProviderUserService} from "../../services/CreateProviderUserService";
import {Request, Response} from "express";

export class CreateProviderUserController {

	public async handle(req: Request, res: Response): Promise<Response> {

		const {name, email, password} = req.body

		const service = container.resolve(CreateProviderUserService)

		const user = await service.execute({name, email, password})

		return res.status(201).json(user)
	}

}
