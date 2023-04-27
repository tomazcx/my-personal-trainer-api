import AppError from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import {ProvidersRepository} from "../repositories/implementation/ProvidersRepository";
import {UserWithProviderData} from "../repositories/IProvidersRepository";

@injectable()
export class ShowProviderUserService {

	constructor(
		@inject('ProvidersRepository')
		private providersRepository: ProvidersRepository
	) {}

	public async execute(id: string): Promise<UserWithProviderData> {
		const providerExists = await this.providersRepository.exists(id)

		if (!providerExists) {
			throw new AppError('Provider not found', 404)
		}

		const provider = await this.providersRepository.findById(id)

		return provider!
	}

}
