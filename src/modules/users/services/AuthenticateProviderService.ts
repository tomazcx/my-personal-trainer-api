import {injectable, inject} from 'tsyringe';
import {sign} from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import {User} from '@prisma/client';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: User;
	token: string;
}

@injectable()
class AuthenticateProviderService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({email, password}: IRequest): Promise<IResponse> {

		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Incorrect email/password combination.', 401);
		}

		if (user.provider_info_id === null) {
			throw new AppError("You can't authenticate as a provider", 403)
		}

		const passwordMatch = await this.hashProvider.compareHash(
			password,
			user.password,
		);

		if (!passwordMatch) {
			throw new AppError('Incorrect email/password combination.', 401);
		}

		const {secret} = authConfig.jwt;

		const token = sign({}, secret, {
			subject: user.id
		});

		return {user, token};
	}
}

export default AuthenticateProviderService;


