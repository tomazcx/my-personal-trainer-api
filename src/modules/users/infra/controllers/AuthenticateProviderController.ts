import AuthenticateProviderService from '@modules/users/services/AuthenticateProviderService'
import {Request, Response} from 'express'
import {container} from 'tsyringe'

export class AuthenticateProviderController {

	public async handle(req: Request, res: Response): Promise<Response> {

		const {email, password} = req.body

		const service = container.resolve(AuthenticateProviderService)

		const {user, token} = await service.execute({email, password});

		return res.status(200).json({user, token});
	}

}
