import nodemailer from "nodemailer";
import { EmailOptions, SendMailOptions } from "../interfaces/email";

export const sendMail = async (options: EmailOptions) => {
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const emailOptions: SendMailOptions = {
		from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USERNAME}>`,
		to: options.email,
		subject: options.subject,
		text: options.message,
		html: `<div style="background-color:#F6F5F5;padding:2%;margin:2%"><h1>${options.subject}</h1><p>${options.message}</p></div>`,
	};
	await transporter.sendMail(emailOptions);
};
