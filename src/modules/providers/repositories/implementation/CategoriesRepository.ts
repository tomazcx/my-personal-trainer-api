import {Category, PrismaClient} from '@prisma/client'
import {prismaClient} from '@shared/infra/db/prisma'
import {ICategoriesRepository} from '../ICategoriesRepository'

export class CategoriesRepository implements ICategoriesRepository {

	private ormRepository: PrismaClient['category']

	constructor() {
		this.ormRepository = prismaClient.category
	}

	public async findAll(): Promise<Category[]> {
		const categories = await this.ormRepository.findMany()
		return categories
	}

}
