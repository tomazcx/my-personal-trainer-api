import {PrismaClient, User} from '@prisma/client';
import {prismaClient} from 'src/shared/infra/db/prisma';
import {ICreateUserDTO} from '../../dto/ICreateUserDTO';
import {IFindAllProvidersDTO} from '../../dto/IFindAllProvidersDTO';
import IUsersRepository from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
	private ormRepository: PrismaClient['user'];

	constructor() {
		this.ormRepository = prismaClient.user
	}

	public async findAllProviders({
		except_user_id,
	}: IFindAllProvidersDTO): Promise<User[]> {
		const users = await this.ormRepository.findMany({
			where: {isProvider: true},
		});

		return users;
	}

	public async findById(id: string): Promise<User | null> {
		const user = this.ormRepository.findFirst({where: {id}});
		return user;
	}

	public async findByEmail(email: string): Promise<User | null> {
		const user = this.ormRepository.findFirst({where: {email}});
		return user;
	}

	public async create({
		name,
		email,
		password,
		isProvider
	}: ICreateUserDTO): Promise<User> {
		const user = this.ormRepository.create({data: {name, email, password, isProvider, created_at: new Date, updated_at: new Date}});

		return user;
	}

	public async verifyIsProvider(id: string): Promise<boolean | null> {
		const user = await this.ormRepository.findFirst({where: {id}})
		return user!.isProvider
	}

	public async save(user: User): Promise<User> {
		return this.ormRepository.update({where: {id: user.id}, data: {...user}});
	}
}

export default UsersRepository;

