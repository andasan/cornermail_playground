"use server";

import { renderAsync } from "@react-email/render";
import cloudinary from "cloudinary";

import { EmailTemplate } from "@/components/emailTemplate";
import { apiInstance, sendSmtpEmail } from "@/lib/brevo";
import { config } from "@/utils/config";

/**
 * Brevo Transactional API instance
 */
export async function sendEmail() {
	sendSmtpEmail.subject = "{{params.subject}}";
	sendSmtpEmail.htmlContent =
		"<html><body><h1>{{params.parameter}}</h1></body></html>";
	sendSmtpEmail.sender = {
		name: config.email.from.name,
		email: config.email.from.address,
	};
	sendSmtpEmail.to = [{ email: "johndoe@example.com", name: "John Doe" }];
	sendSmtpEmail.replyTo = {
		email: config.email.from.address,
		name: config.email.from.name,
	};
	sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
	sendSmtpEmail.params = {
		parameter: "This is my first transactional test email",
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

type EmailTemplatesProps = (params: {
	email: string;
	firstName: string;
	lastName: string;
	folder: string;
}) => Promise<{ message: string; status: number }>;

export const testSend: EmailTemplatesProps = async ({
	email,
	firstName,
	lastName,
	folder,
}) => {
	return new Promise((resolve, reject) => {
		try {
			const identifier = `${folder}/${firstName.trim()}_${lastName.trim()}`;

			cloudinary.v2.api.resource(identifier, (error, result) => {
				if (error) {
					reject({
						message: config.error.invalidCloudinaryResource || error.message,
						status: 404,
					});
				} else {
					resolve({
						message: `Email sent to ${email} with attachment url: ${result.secure_url}`,
						status: 250,
					});

					renderAsync(EmailTemplate({ studentName: firstName }), {
						pretty: true,
					}).then((emailHtml) => {
						const mailOptions = {
							from: {
								name: config.email.from.name,
								address: config.email.from.address,
							},
							to: email,
							subject: config.email.subject,
							attachments: [
								{
									name: "t2202-fill-21e.pdf",
									url: result.secure_url,
								},
							],
							html: emailHtml,
						};

						const { to, from, subject, attachments, html } = mailOptions;
						sendSmtpEmail.subject = subject;
						sendSmtpEmail.htmlContent = html;
						sendSmtpEmail.sender = { name: from.name, email: from.address };
						sendSmtpEmail.to = [
							{ email: to, name: `${firstName} ${lastName}` },
						];
						sendSmtpEmail.replyTo = { name: from.name, email: from.address };
						sendSmtpEmail.attachment = attachments;
						apiInstance.sendTransacEmail(sendSmtpEmail).then(
							// biome-ignore lint/suspicious/noExplicitAny: <explanation>
							async (data: any) => {
								resolve({ message: `Email sent to ${email}`, status: 250 });
							},
							// biome-ignore lint/suspicious/noExplicitAny: <explanation>
							(error: any) => {
								console.error(error);
								reject({
									message: error.message || error.response,
									status: error.responseCode || 500,
								});
							},
						);
					});
				}
			});

			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (err: any) {
			// Handle the error.
			reject({ message: err.message || err, status: 500 });
		}
	});
};
