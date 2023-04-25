import {User} from "@prisma/client";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import AppError from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
	name: string
	email: string
	password: string
}

@injectable()
export class CreateProviderUserService {

	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider,

		@inject('HashProvider')
		private hashProvider: IHashProvider
	) {}

	public async execute({email, name, password}: IRequest): Promise<User> {

		const emailIsRegistered = await this.usersRepository.findByEmail(email)

		if (emailIsRegistered) {
			throw new AppError('Email address already being used', 422)
		}

		const hashedPassword = await this.hashProvider.generateHash(password)

		const user = await this.usersRepository.create({
			name,
			email,
			password: hashedPassword,
			isProvider: true
		})

		await this.cacheProvider.invalidatePrefix('providers-list');

		return user
	}

}
