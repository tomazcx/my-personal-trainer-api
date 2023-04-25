import {Request, Response} from 'express';
import {container} from 'tsyringe';

import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ShowProfileController {
	public async show(req: Request, res: Response): Promise<Response> {
		const user_id = req.user.id;

		const showProfile = container.resolve(ShowProfileService);

		const user = await showProfile.execute({user_id});

		return res.status(200).json(user);
	}
}

