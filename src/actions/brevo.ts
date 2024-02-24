"use server";

import {
	AccountApi,
	AccountApiApiKeys,
	SendSmtpEmail,
	TransactionalEmailsApi,
	TransactionalEmailsApiApiKeys,
} from "@getbrevo/brevo";

import { config } from "@/utils/config";
import cloudinary from "cloudinary";

/**
 * Brevo Account API instance
 */
export async function getAccount() {
	const accountApiInstance = new AccountApi();

	accountApiInstance.setApiKey(AccountApiApiKeys.apiKey, config.brevoApiKey);

	const data = await accountApiInstance.getAccount();
	console.log(data);

	return {
		message: "API called successfully",
	};
}

/**
 * Brevo Transactional API instance
 */
export async function sendEmail() {
	const apiInstance = new TransactionalEmailsApi();
	const sendSmtpEmail = new SendSmtpEmail();

	apiInstance.setApiKey(
		TransactionalEmailsApiApiKeys.apiKey,
		config.brevoApiKey,
	);

	sendSmtpEmail.subject = "{{params.subject}}";
	sendSmtpEmail.htmlContent =
		"<html><body><h1>This is my first transactional test email {{params.parameter}}</h1></body></html>";
	sendSmtpEmail.sender = { name: "Tax CICCC", email: config.email.from };
	sendSmtpEmail.to = [{ email: "andasan@gmail.com", name: "Francois Polo" }];
	sendSmtpEmail.replyTo = { email: config.email.from, name: "Tax CICCC" };
	sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
	sendSmtpEmail.params = {
		parameter: "My param value",
		subject: config.email.subject,
	};

	try {
		const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
		console.log(data);

		return {
			message: "API called successfully",
		};
	} catch (error) {
		console.error(error);

		return {
			message: "API call failed",
		};
	}
}

type EmailTemplates = (params: {
	email: string;
	firstName: string;
	lastName: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
}) => Promise<any>;

const testSend: EmailTemplates = async ({ email, firstName, lastName }) => {
	return new Promise((resolve, reject) => {
		try {
			const identifier = `${firstName.trim()}_${lastName.trim()}`;

			cloudinary.v2.api.resource(identifier, (error, result) => {
				if (error) {
					console.log("cloud error: ", error);
					reject({
						message:
							"Failed to send email. Student's T2202 form doesn't exists",
						status: 404,
					});
				} else {
					// const emailHtml = render(<EmailTemplate studentName={firstName} />, { pretty: true });
					// const mailOptions = {
					//   from: config.email.from || 'tax@ciccc.ca',
					//   to: email,
					//   subject: config.email.subject || 'T2202 Form',
					//   attachments: [
					//     {
					//       name: 't2202-fill-21e.pdf',
					//       url: result.secure_url,
					//     },
					//   ],
					//   html: emailHtml,
					// };
					// const { to, from, subject, attachments, html } = mailOptions;
					// sendSmtpEmail.subject = subject;
					// sendSmtpEmail.htmlContent = html;
					// sendSmtpEmail.sender = { "name": "Tax CICCC", "email": from };
					// sendSmtpEmail.to = [{ "email": to, "name": `${firstName} ${lastName}` }];
					// sendSmtpEmail.replyTo = { "email": "tax@ciccc.ca", "name": "Tax CICCC" };
					// sendSmtpEmail.attachment = attachments;
					// apiInstance.sendTransacEmail(sendSmtpEmail).then(async (data: any) => {
					//   // console.info('API called successfully. Returned data: ' + JSON.stringify(data));
					//   resolve({ message: `Email sent to ${email}`, status: 250 });
					// }, function (error: any) {
					//   console.error(error);
					//   reject({
					//     message: error.message || error.response,
					//     status: error.responseCode || 500,
					//   });
					// });
				}
			});

			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (err: any) {
			// Handle the error.
			reject({ message: err.message || err, status: 500 });
		}
	});
};
