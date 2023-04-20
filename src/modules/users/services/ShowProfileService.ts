import {injectable, inject} from 'tsyringe';

import AppError from 'src/shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import {User} from '@prisma/client';

interface IRequest {
	user_id: string;
}

@injectable()
class ShowProfileService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({user_id}: IRequest): Promise<User> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('Only authenticated users can change avatar.', 401);
		}

		return user;
	}
}

export default ShowProfileService;

