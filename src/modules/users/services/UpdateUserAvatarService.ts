import {User} from '@prisma/client';
import IStorageProvider from 'src/shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from 'src/shared/errors/AppError';
import {injectable, inject} from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
	user_id: string;
	avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('StorageProvider')
		private storageProvider: IStorageProvider,
	) {}

	public async execute({user_id, avatarFilename}: IRequest): Promise<User> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			await this.storageProvider.deleteFile(avatarFilename);
			throw new AppError('Only authenticated users can change avatar.', 401);
		}

		if (user.avatar) {
			await this.storageProvider.deleteFile(user.avatar);
		}

		user.avatar = avatarFilename;

		await this.usersRepository.save(user);

		return user;
	}
}

export default UpdateUserAvatarService;
