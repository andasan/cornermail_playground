'use server';

import { renderAsync } from '@react-email/render';
import { sql } from '@vercel/postgres';
import cloudinary from 'cloudinary';

import { EmailTemplate } from '@/components/emailTemplate';
import { apiInstance, sendSmtpEmail } from '@/lib/brevo';
import { config } from '@/utils/config';

type EmailTemplatesProps = {
	organizationId: string;
	email: string;
	firstName: string;
	lastName: string;
	folder: string;
};

export async function editStatusColumn(recipientIds: string[]) {
	try {
		await sql.query(
			`UPDATE Recipients SET UpdatedAt = NOW(), Status = 'sent' WHERE Organizationid = ANY($1)`,
			[recipientIds],
		);

		return true;
	} catch (error) {
		console.log(error);
	}

	return false;
}

export const sendBulkEmail = async (recipients: EmailTemplatesProps[]) => {
	const emailPromises = recipients.map(
		async ({ email, firstName, lastName, folder, organizationId }) => {
			return new Promise((resolve, reject) => {
				const identifier = `${folder}/${firstName.trim()}_${lastName.trim()}`;

				cloudinary.v2.api
					.resource(identifier)
					.then((result) => {
						/**
						 * Cloudinary resource found (TESTING PURPOSES ONLY)
						 */
						resolve({
							message: `Email sent to ${email}`,
							resource: { organizationId, email, firstName, lastName },
							status: 200,
						});

						// renderAsync(EmailTemplate({ studentName: firstName }), {
						// 	pretty: true,
						// }).then((emailHtml) => {
						// 	const mailOptions = {
						// 		from: {
						// 			name: config.email.from.name,
						// 			address: config.email.from.address,
						// 		},
						// 		to: email,
						// 		subject: config.email.subject,
						// 		attachments: [
						// 			{
						// 				name: "T2202.pdf",
						// 				url: result.secure_url,
						// 			},
						// 		],
						// 		html: emailHtml,
						// 	};

						// 	const { to, from, subject, attachments, html } = mailOptions;
						// 	sendSmtpEmail.subject = subject;
						// 	sendSmtpEmail.htmlContent = html;
						// 	sendSmtpEmail.sender = { name: from.name, email: from.address };
						// 	sendSmtpEmail.to = [
						// 		{ email: to, name: `${firstName} ${lastName}` },
						// 	];
						// 	sendSmtpEmail.replyTo = {
						// 		name: from.name,
						// 		email: from.address,
						// 	};
						// 	sendSmtpEmail.attachment = attachments;
						// 	apiInstance.sendTransacEmail(sendSmtpEmail).then(
						// 		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						// 		(data: any) => {
						// 			resolve({
						// 				message: `Email sent to ${email}`,
						// 				resource: { organizationId, email, firstName, lastName },
						// 				status: 200,
						// 			});
						// 		},
						// 		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						// 		(error: any) => {
						// 			/**
						// 			 * SMTP API error
						// 			 */
						// 			failureCounts[organizationId] =
						// 				(failureCounts[organizationId] || 0) + 1;
						// 			failureList[organizationId] = [
						// 				...(failureList[organizationId] || []),
						// 				email,
						// 			];

						// 			resolve({
						// 				message: error.message || error.response,
						// 				resource: { organizationId, email, firstName, lastName },
						// 				status: error.responseCode || 500,
						// 			});
						// 		},
						// 	);
						// });
					})
					.catch((error) => {
						/**
						 * No Cloudinary resource found
						 */
						resolve({
							message: config.error.invalidCloudinaryResource || error.message,
							resource: { organizationId, email, firstName, lastName },
							status: 404,
						});
					});

				/**
				 * Cloudinary API error
				 */
				// } catch (err: any) {
				// 	failureCounts[organizationId] =
				// 		(failureCounts[organizationId] || 0) + 1;
				// 	failureList[organizationId] = [
				// 		...(failureList[organizationId] || []),
				// 		email,
				// 	];

				// 	reject({ message: err.message || err, status: 500 });
				// }
			});
		},
	);

	return await Promise.all(emailPromises);
};
