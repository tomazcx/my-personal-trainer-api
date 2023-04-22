import ICreateNotificationDTO from "../dto/ICreateNotificationDTO";
import {Notification} from "@prisma/client";

export default interface INotificationsRepository {
	create(dara: ICreateNotificationDTO): Promise<Notification>;
}

