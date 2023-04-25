import {Request, Response} from 'express';
import {container} from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';

export default class UpdateProfileController {


	public async update(req: Request, res: Response): Promise<Response> {
		const user_id = req.user.id;
		const {name, email, old_password, password} = req.body;

		const updatePofile = container.resolve(UpdateProfileService);

		const user = await updatePofile.execute({
			user_id,
			name,
			email,
			old_password,
			password,
		});

		return res.status(200).json(user);
	}
}

