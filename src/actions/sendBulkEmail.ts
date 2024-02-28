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
	folder: string;
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
	const emailPromises = recipients.map(
		async ({ email, firstName, lastName, folder, organizationId }) => {
			return new Promise((resolve, reject) => {
				const identifier = `${folder}/${firstName.trim()}_${lastName.trim()}`;

				cloudinary.v2.api
					.resource(identifier)
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
										resource: { organizationId, email, firstName, lastName },
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
							resource: { organizationId, email, firstName, lastName },
							status: 404,
						});
					});
			});
		},
	);

	return await Promise.all(emailPromises);
};
