import {injectable, inject} from 'tsyringe';

import {User} from '@prisma/client';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
	name: string;
	email: string;
	password: string;
}

@injectable()
export class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider,

	) {}

	public async execute({name, email, password}: IRequest): Promise<User> {
		const isExists = await this.usersRepository.findByEmail(email);

		if (isExists) {
			throw new AppError('Email address already used.');
		}

		const hashedPassword = await this.hashProvider.generateHash(password);

		const user = await this.usersRepository.create({
			name,
			email,
			password: hashedPassword
		});

		return user;
	}
}
