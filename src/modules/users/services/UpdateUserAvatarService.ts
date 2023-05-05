import {User} from '@prisma/client';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
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

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
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

		await this.cacheProvider.invalidatePrefix('providers-list');
		await this.cacheProvider.invalidatePrefix('providers-appointments');
		await this.cacheProvider.invalidatePrefix('user-appointments');

		return user;
	}
}

export default UpdateUserAvatarService;
