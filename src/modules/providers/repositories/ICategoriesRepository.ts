import {Category} from "@prisma/client";

export interface ICategoriesRepository {
	findAll(): Promise<Category[]>
}
