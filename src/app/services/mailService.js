import transport from '../../modules/mailer';
import process from 'process';

class mailService {
	async forgotPassMail(mailData) {
		try {
			mailData.from = process.env.FORGOT_PASS_MAIL;
			const sendMail = await transport.sendMail(mailData);
            
			return sendMail;
		} catch(err) {
			console.error(err);
            
			return err;
		}
	}
}

export default new mailService();