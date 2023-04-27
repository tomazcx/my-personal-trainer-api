import {PrismaClient, User} from '@prisma/client';
import {prismaClient} from '@shared/infra/db/prisma';
import {ICreateUserDTO} from '../../dto/ICreateUserDTO';
import IUsersRepository from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
	private ormRepository: PrismaClient['user'];

	constructor() {
		this.ormRepository = prismaClient.user
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
	}: ICreateUserDTO): Promise<User> {
		const user = this.ormRepository.create({data: {name, email, password}});

		return user;
	}


	public async save(user: User): Promise<User> {
		return this.ormRepository.update({where: {id: user.id}, data: {...user}});
	}
}

export default UsersRepository;

