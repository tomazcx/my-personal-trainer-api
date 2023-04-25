import ISendMailDTO from "../dto/ISendMailDTO";
import sgMail from "@config/mail";
import IMailProvider from "../models/IMailProvider";
import {getTemplate} from "../templates/email-template";

class MailProvider implements IMailProvider {

	public async sendMail(data: ISendMailDTO): Promise<void> {
		await sgMail.send({
			to: data.to.email,
			from: 'tomazcxbusiness@gmail.com',
			subject: data.subject,
			html: getTemplate(data.token)
		})
	}

}

export default MailProvider
