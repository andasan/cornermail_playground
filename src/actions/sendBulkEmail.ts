'use server';

import { renderAsync } from '@react-email/render';
import cloudinary from 'cloudinary';

import { EmailTemplate } from '@/components/emailTemplate';
import { apiInstance, sendSmtpEmail } from '@/lib/brevo';
import { pool } from '@/lib/pg';
import { config } from '@/utils/config';

type EmailTemplatesProps = {
	organizationId: string;
	email: string;
	firstName: string;
	lastName: string;
	identifier: string;
};

export async function editStatusColumn(recipientIds: string[]) {
	const client = await pool.connect();
	try {
		await client.query('BEGIN');
		await client.query(
			`UPDATE ${client.escapeIdentifier(
				config.databaseTable,
			)} SET UpdatedAt = NOW(), Status = 'sent' WHERE Organizationid = ANY($1)`,
			[recipientIds],
		);

		await client.query('COMMIT');
		return true;
	} catch (error) {
		await client.query('ROLLBACK');
		console.log(error);
	} finally {
		client.release();
	}

	return false;
}

export const sendBulkEmail = async (recipients: EmailTemplatesProps[]) => {
	console.log('FOLDER: ', config.cloudinary.folder_name_server);
	const emailPromises = recipients.map(
		async ({ email, firstName, lastName, organizationId, identifier }) => {
			return new Promise((resolve, reject) => {
				cloudinary.v2.api
					.resource(`${config.cloudinary.folder_name_server}/${identifier}`)
					.then((result) => {
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
										name: 'T2202.pdf',
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
							sendSmtpEmail.replyTo = {
								name: from.name,
								email: from.address,
							};
							sendSmtpEmail.attachment = attachments;
							apiInstance.sendTransacEmail(sendSmtpEmail).then(
								// biome-ignore lint/suspicious/noExplicitAny: <explanation>
								(data: any) => {
									/**
									 * SMTP API success
									 */
									resolve({
										message: `Email sent to ${email}`,
										resource: { organizationId, email, firstName, lastName },
										status: 200,
									});
								},
								// biome-ignore lint/suspicious/noExplicitAny: <explanation>
								(error: any) => {
									/**
									 * SMTP API error
									 */
									resolve({
										message: error.message || error.response,
										resource: {
											organizationId,
											email,
											firstName,
											lastName,
											identifier,
											folder: config.cloudinary.folder_name_server,
										},
										status: error.responseCode || 500,
									});
								},
							);
						});
					})
					.catch((error) => {
						/**
						 * No Cloudinary resource found
						 */
						resolve({
							message: config.error.invalidCloudinaryResource || error.message,
							resource: {
								organizationId,
								email,
								firstName,
								lastName,
								identifier,
								folder: config.cloudinary.folder_name_server,
							},
							status: 404,
						});
					});
			});
		},
	);

	const result = await Promise.all(emailPromises);
	console.log(`
	====================================
	Emails sent: ${result.length}
	====================================
	${JSON.stringify(result, null, 2)}
	====================================
	`);

	return result;
};
