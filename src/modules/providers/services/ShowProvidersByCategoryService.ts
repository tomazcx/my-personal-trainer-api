import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import {inject, injectable} from "tsyringe";
import {ProvidersRepository} from "../repositories/implementation/ProvidersRepository";
import {UserWithProviderData} from "../repositories/IProvidersRepository";

@injectable()
export class ShowProvidersByCategoryService {

	constructor(
		@inject('ProvidersRepository')
		private providersRepository: ProvidersRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
	) {}

	public async execute(category_id: string): Promise<UserWithProviderData[]> {
		let users = await this.cacheProvider.recover<UserWithProviderData[]>(`providers-list:${category_id}`)

		if (!users) {
			users = await this.providersRepository.findByCategory(category_id)

			await this.cacheProvider.save(`providers-list-${category_id}`, users)
		}

		return users
	}

}
