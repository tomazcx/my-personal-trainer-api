import {ListAllProvidersService} from "@modules/providers/services/ListAllProvidersService";
import {Request, Response} from "express";
import {container} from "tsyringe";

export class ListAllProvidersController {

	public async handle(req: Request, res: Response): Promise<Response> {
		const service = container.resolve(ListAllProvidersService)

		const providers = await service.execute()

		return res.status(200).json(providers)
	}

}
