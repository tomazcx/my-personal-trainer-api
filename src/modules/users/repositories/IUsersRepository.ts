import {User} from '@prisma/client';
import {ICreateUserDTO} from '../dto/ICreateUserDTO';
import {IFindAllProvidersDTO} from '../dto/IFindAllProvidersDTO';

export default interface IUsersRepository {
	findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	verifyIsProvider(id: string): Promise<boolean | null>;
	create(data: ICreateUserDTO): Promise<User>;
	save(user: User): Promise<User>;
}

