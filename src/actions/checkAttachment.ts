'use server';
import { sql } from '@vercel/postgres';
import { format } from 'date-fns';

import { Recipient } from '@/app/(auth)/recipients/_data/schema';
import cloudinary from 'cloudinary';

async function editWithAttachmentColumn(recipient: Recipient) {
	const { organizationId, withAttachment } = recipient;

	const updatedAt = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

	try {
		await sql`
            UPDATE Recipients
            SET
                UpdatedAt = ${updatedAt},
								Withattachment = ${withAttachment}
            WHERE
                organizationId = ${organizationId};
        `;
	} catch (error) {
		console.log(error);
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
