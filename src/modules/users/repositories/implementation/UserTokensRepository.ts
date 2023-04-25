import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import {PrismaClient, UserToken} from '@prisma/client';
import {prismaClient} from '@shared/infra/db/prisma';

class UserTokensRepository implements IUserTokensRepository {
	private ormRepository: PrismaClient['userToken'];

	constructor() {
		this.ormRepository = prismaClient.userToken;
	}

	public async findByToken(token: string): Promise<UserToken | null> {
		const userToken = this.ormRepository.findFirst({where: {token}});
		return userToken;
	}

	public async generate(user_id: string): Promise<UserToken> {
		const userToken = this.ormRepository.create({data: {user_id, created_at: new Date, updated_at: new Date}})

		return userToken;
	}
}

export default UserTokensRepository;

