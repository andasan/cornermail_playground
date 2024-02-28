'use server';
import cloudinary from 'cloudinary';
import { format } from 'date-fns';

import { Recipient } from '@/app/(auth)/recipients/_data/schema';
import { pool } from '@/lib/pg';
import { config } from '@/utils/config';

async function editWithAttachmentColumn(recipient: Recipient) {
	const { organizationId, withAttachment } = recipient;
	const client = await pool.connect();

	const updatedAt = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

	try {
		await client.query('BEGIN');
		await client.query(
			`
			UPDATE ${client.escapeIdentifier(config.databaseTable)}
			SET
					UpdatedAt = $1,
					Withattachment = $2
			WHERE
					organizationId = $3;
		`,
			[updatedAt, withAttachment, organizationId],
		);

		await client.query('COMMIT');
	} catch (error) {
		await client.query('ROLLBACK');
		console.log(error);
	} finally {
		client.release();
	}
}

const year = new Date().getFullYear().toString();

export default async function cloudinaryApi(
	recipients: Recipient[],
	folder = year,
) {
	const recipientsWithAttachment: string[] = [];

	await Promise.all(
		recipients.map(async (recipient) => {
			const { firstName, lastName } = recipient;

			const identifier = `${folder}/${firstName.trim()}_${lastName.trim()}`;

			try {
				await cloudinary.v2.api.resource(identifier);

				recipient.withAttachment = true;
				recipientsWithAttachment.push(recipient.organizationId);
				await editWithAttachmentColumn(recipient);
			} catch (error: unknown) {
				console.error(
					`Error fetching resource for ${identifier}: ${
						(error as Error).message
					}`,
				);
			}
		}),
	);

	return recipientsWithAttachment;
}
