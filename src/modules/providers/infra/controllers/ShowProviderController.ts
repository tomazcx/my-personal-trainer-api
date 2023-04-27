import {ShowProviderUserService} from "@modules/providers/services/ShowProviderService";
import {Request, Response} from "express";
import {container} from "tsyringe";

export class ShowProviderController {

	public async handle(req: Request, res: Response): Promise<Response> {
		const {id} = req.params

		const service = container.resolve(ShowProviderUserService)

		const user = await service.execute(id)

		return res.status(200).json(user)
	}

}
