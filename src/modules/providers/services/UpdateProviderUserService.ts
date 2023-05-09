import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import AppError from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import {IProvidersRepository} from "../repositories/IProvidersRepository";

interface IRequest {
	id: string
	description?: string
	category_id?: string
	startHour?: number
	endHour?: number
}

@injectable()
export class UpdateProviderUserService {

	constructor(
		@inject('ProvidersRepository')
		private providersRepository: IProvidersRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
	) {}

	public async execute({id, startHour, endHour, ...rest}: IRequest): Promise<void> {

		const verifyIsProvider = await this.providersRepository.verifyIsProvider(id)

		if (!verifyIsProvider) {
			throw new AppError('You are not a provider', 403)
		}

		const providerExists = await this.providersRepository.exists(id)

		if (!providerExists) {
			throw new AppError('Provider not found', 404)
		}

		if (startHour && endHour) {

			if ((startHour > 21 || startHour < 6) || (endHour > 21 || endHour < 6)) {
				throw new AppError('Select a hour between 6 and 21', 422)
			}

			if (startHour >= endHour) {
				throw new AppError('The start hour cannot be bigger or equal than the end hour', 422)
			}
		}

		console.log(rest)

		await this.providersRepository.updateProviderData({endHour, startHour, ...rest}, id,)

		await this.cacheProvider.invalidate('providers-list')

	}

}
