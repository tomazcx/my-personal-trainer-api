import {Category, ProviderInfo, User} from "@prisma/client";
import {ICreateProviderDTO} from "../dto/ICreateProviderDTO";
import {IUpdateProviderDataDTO} from "../dto/IUpdateProviderDataDTO";

export interface UserWithProviderData extends User {
	ProviderInfo: {category: Category} & ProviderInfo
	provider_info: {category: Category} & ProviderInfo
}

export interface IProvidersRepository {
	findById(id: string): Promise<UserWithProviderData | null>;
	findAll(): Promise<UserWithProviderData[]>
	exists(id: string): Promise<boolean>
	create(data: ICreateProviderDTO): Promise<UserWithProviderData>;
	verifyIsProvider(id: string): Promise<boolean>;
	findByCategory(category_id: string): Promise<UserWithProviderData[]>;
	updateProviderData(data: IUpdateProviderDataDTO, id: string): Promise<void>
}
