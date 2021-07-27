import nodemailer from 'nodemailer';
import process from 'process';

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

const transport = nodemailer.createTransport({
	host: MAIL_HOST,
	port: MAIL_PORT,
	auth: {
		user: MAIL_USER,
		pass: MAIL_PASS
	}
});

export default transport;