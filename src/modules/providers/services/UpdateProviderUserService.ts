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

		const providerExists = await this.providersRepository.exists(id)

		if (!providerExists) {
			throw new AppError('Provider not found', 404)
		}

		if (startHour && endHour) {

			if ((startHour > 24 || startHour < 0) || (endHour > 24 || endHour < 0)) {
				throw new AppError('Select a hour between 0 and 24', 422)
			}

			if (startHour >= endHour) {
				throw new AppError('The start hour cannot be bigger or equal thant the end hour', 422)
			}
		}

		await this.providersRepository.updateProviderData(rest, id)

		await this.cacheProvider.invalidate('providers-list')

	}

}
