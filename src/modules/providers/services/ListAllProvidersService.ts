import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import {inject, injectable} from "tsyringe";
import {IProvidersRepository, UserWithProviderData} from "../repositories/IProvidersRepository";

@injectable()
export class ListAllProvidersService {

	constructor(
		@inject('ProvidersRepository')
		private providersRepository: IProvidersRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
	) {}

	public async execute(): Promise<UserWithProviderData[]> {

		let users = await this.cacheProvider.recover<UserWithProviderData[]>('providers-list');

		if (!users) {
			users = await this.providersRepository.findAll()

			await this.cacheProvider.save('providers-list', users)
		}

		return users
	}

}
