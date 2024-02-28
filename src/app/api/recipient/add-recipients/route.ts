import { Recipient } from '@/app/(auth)/recipients/_data/schema';
import { config } from '@/utils/config';
import { format } from 'date-fns';
import { NextResponse } from 'next/server';

import { pool } from '@/lib/pg';

export async function POST(request: Request) {
	const recipients = (await request.json()) as Recipient[];

	const createdAt = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
	const updatedAt = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

	const client = await pool.connect();

	try {
		if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
			throw new Error('Invalid or empty recipient array');
		}

		try {
			await client.query('BEGIN');

			const insertValues = recipients
				.map(
					({ firstName, lastName, email, batch, organizationId, identifier }) =>
						`(
							'${firstName}',
							'${lastName}',
							'${email}',
							'${batch}',
							'idle',
							'${organizationId}',
							'${identifier}',
							'${createdAt}',
							'${updatedAt}',
							false
						)`,
				)
				.join(',');

			await client.query(`
                INSERT INTO ${client.escapeIdentifier(config.databaseTable)} (
                    FirstName,
                    LastName,
                    Email,
                    Batch,
                    Status,
                    OrganizationId,
										Identifier,
                    CreatedAt,
                    UpdatedAt,
										Withattachment
                ) VALUES ${insertValues};
            `);

			await client.query('COMMIT');
		} catch (error) {
			await client.query('ROLLBACK');
			throw error;
		} finally {
			client.release();
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error }, { status: 500 });
	}

	const insertedRecipients = await pool.query(
		`SELECT * FROM ${client.escapeIdentifier(config.databaseTable)}`,
	);
	return NextResponse.json(
		{ recipients: insertedRecipients.rows },
		{ status: 200 },
	);
}
