import {ShowProviderUserService} from "@modules/providers/services/ShowProviderService";
import {Request, Response} from "express";
import {container} from "tsyringe";

export class ShowProviderController {

	public async handle(req: Request, res: Response): Promise<Response> {
		const {provider_id} = req.params

		const service = container.resolve(ShowProviderUserService)

		const user = await service.execute(provider_id)

		return res.status(200).json(user)
	}

}
