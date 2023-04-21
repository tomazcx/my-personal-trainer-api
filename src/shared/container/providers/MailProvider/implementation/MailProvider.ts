import ISendMailDTO from "../dto/ISendMailDTO";
import sgMail from "src/config/mail";
import IMailProvider from "../models/IMailProvider";

class MailProvider implements IMailProvider {

	public async sendMail(data: ISendMailDTO): Promise<void> {
		await sgMail.send({
			to: data.to.email,
			from: 'tomazcxbusiness@gmail.com',
			subject: data.subject,
			text: `Here is your token: ${data.token} `
		})
	}

}

export default MailProvider
