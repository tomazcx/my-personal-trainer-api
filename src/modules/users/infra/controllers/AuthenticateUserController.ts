import {Request, Response} from 'express';
import {container} from 'tsyringe';

import AuthenticateUserService from 'src/modules/users/services/AuthenticateUserService';

export default class AuthenticateUserController {
	public async create(req: Request, res: Response): Promise<Response> {
		const {email, password} = req.body;

		const authenticateUser = container.resolve(AuthenticateUserService);

		const {user, token} = await authenticateUser.execute({email, password});

		return res.status(200).json({user, token});
	}
}

