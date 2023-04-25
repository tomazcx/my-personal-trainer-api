import {PrismaClient} from '@prisma/client';
import {prismaClient} from '@shared/infra/db/prisma';
import ICreateNotificationDTO from '../../dto/ICreateNotificationDTO';
import INotificationsRepository from '../INotificationRepository';
import {Notification} from '@prisma/client';

class NotificationsRepository implements INotificationsRepository {
	private ormRepository: PrismaClient['notification'];

	constructor() {
		this.ormRepository = prismaClient.notification
	}

	public async create({
		content,
		recipient_id,
	}: ICreateNotificationDTO): Promise<Notification> {
		const notification = this.ormRepository.create({
			data: {
				content,
				recipient_id
			}
		});

		return notification;
	}
}

export default NotificationsRepository;

