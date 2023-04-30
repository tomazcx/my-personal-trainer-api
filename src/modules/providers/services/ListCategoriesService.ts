import {Category} from "@prisma/client";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import {inject, injectable} from "tsyringe";
import {ICategoriesRepository} from "../repositories/ICategoriesRepository";

@injectable()
export class ListCategoriesService {

	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider
	) {}

	public async execute(): Promise<Category[]> {

		let categories = await this.cacheProvider.recover<Category[]>('categories')

		if (!categories) {
			categories = await this.categoriesRepository.findAll()
			this.cacheProvider.save('categories', categories)
		}

		return categories
	}

}
