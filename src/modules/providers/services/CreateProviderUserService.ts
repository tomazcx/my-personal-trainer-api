import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import AppError from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import {IProvidersRepository, UserWithProviderData} from "../repositories/IProvidersRepository";

interface IRequest {
	name: string
	email: string
	password: string
	category_id: string
}

@injectable()
export class CreateProviderUserService {

	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('ProvidersRepository')
		private providersRepository: IProvidersRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider,

		@inject('HashProvider')
		private hashProvider: IHashProvider
	) {}

	public async execute({email, name, password, category_id}: IRequest): Promise<UserWithProviderData> {

		const emailIsRegistered = await this.usersRepository.findByEmail(email)

		if (emailIsRegistered) {
			throw new AppError('Email address already being used', 422)
		}

		const hashedPassword = await this.hashProvider.generateHash(password)

		const user = await this.providersRepository.create({
			name,
			email,
			password: hashedPassword,
			category_id
		})

		await this.cacheProvider.invalidatePrefix('providers-list');

		return user
	}

}
