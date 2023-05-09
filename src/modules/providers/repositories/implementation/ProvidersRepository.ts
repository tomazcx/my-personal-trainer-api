import {ICreateProviderDTO} from "@modules/providers/dto/ICreateProviderDTO";
import {IUpdateProviderDataDTO} from "@modules/providers/dto/IUpdateProviderDataDTO";
import {Category, Prisma, PrismaClient, User} from "@prisma/client";
import {prismaClient} from "@shared/infra/db/prisma";
import {IProvidersRepository, UserWithProviderData} from "../IProvidersRepository";


export class ProvidersRepository implements IProvidersRepository {

	private ormRepository: PrismaClient['user']

	constructor() {
		this.ormRepository = prismaClient.user
	}

	public async findById(id: string): Promise<UserWithProviderData | null> {
		const user = await this.ormRepository.findFirst({
			where: {
				provider_info_id: {
					not: null
				},
				id
			},
			include: {
				ProviderInfo: {
					include: {
						category: true
					}
				},
			}

		})
		return user as UserWithProviderData

	}

	public async exists(id: string): Promise<boolean> {
		const user = await this.ormRepository.findFirst({
			where: {
				provider_info_id: {
					not: null
				},
				id
			}
		})
		return !!user
	}

	public async findAll(): Promise<UserWithProviderData[]> {
		const users = await this.ormRepository.findMany({
			where: {
				provider_info_id: {
					not: null
				}
			},
			include: {
				ProviderInfo: {
					include: {
						category: true
					}
				},
			}
		})

		return users as UserWithProviderData[]
	}

	public async findByCategory(category_id: string): Promise<UserWithProviderData[]> {
		const users = await this.ormRepository.findMany({
			where: {
				AND: {
					provider_info_id: {
						not: null
					},
					ProviderInfo: {
						category_id
					}
				}

			},
			include: {
				ProviderInfo: {
					include: {
						category: true
					}
				},
			}
		})


		return users as UserWithProviderData[]
	}

	public async verifyIsProvider(id: string): Promise<boolean> {
		const user = await this.ormRepository.findFirst({
			where: {
				id
			}
		})
		return !!user?.provider_info_id
	}

	public async create({name, email, password, category_id}: ICreateProviderDTO): Promise<UserWithProviderData> {
		const user = await this.ormRepository.create({
			data: {
				name,
				email,
				password,
				ProviderInfo: {
					create: {
						startHour: 8,
						endHour: 18,
						category: {
							connect: {
								id: category_id
							}
						}
					}

				}
			},
			include: {
				ProviderInfo: {
					include: {
						category: true
					}
				}
			}
		})

		await this.ormRepository.update({
			where: {
				id: user.id
			},
			data: {
				provider_info_id: user.ProviderInfo!.id
			}
		})


		return user as UserWithProviderData
	}

	public async updateProviderData(data: IUpdateProviderDataDTO, id: string): Promise<void> {
		console.log(data)
		await this.ormRepository.update({
			where: {id},
			data: {
				ProviderInfo: {
					update: {...data}
				}
			}
		})
	}
}
