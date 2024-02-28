import { format } from 'date-fns';
import { NextResponse } from 'next/server';

import { pool } from '@/lib/pg';
import { config } from '@/utils/config';

export async function PUT(request: Request) {
	const res = await request.json();
	const client = await pool.connect();

	const { firstName, lastName, email, batch, organizationId, status } = res;
	const updatedAt = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

	try {
		if (
			!firstName ||
			!lastName ||
			!email ||
			!batch ||
			!organizationId ||
			!status
		)
			throw new Error('Recipient details required');

		await client.query('BEGIN');
		await client.query(
			`
			UPDATE ${client.escapeIdentifier(config.databaseTable)}
			SET
					FirstName = $1,
					LastName = $2,
					Email = $3,
					Batch = $4,
					Status = $5,
					OrganizationId = $6,
					UpdatedAt = $7
			WHERE
					organizationId = $8;
		`,
			[
				firstName,
				lastName,
				email,
				batch,
				status,
				organizationId,
				updatedAt,
				res.organizationId,
			],
		);
		await client.query('COMMIT');
	} catch (error) {
		console.log(error);
		await client.query('ROLLBACK');
		return NextResponse.json({ error }, { status: 500 });
	}

	try {
		await client.query('BEGIN');
		const updatedRecipient = await client.query(
			`
		SELECT
			firstname as "firstName",
			lastname as "lastName",
			email,
			batch,
			status,
			organizationid as "organizationId",
			identifier,
			createdat as "createdAt",
			updatedat as "updatedAt",
			withattachment as "withAttachment"
		FROM ${client.escapeIdentifier(config.databaseTable)}
		WHERE organizationId = $1;`,
			[res.organizationId],
		);
		await client.query('COMMIT');
		return NextResponse.json(
			{ recipient: updatedRecipient.rows[0] },
			{ status: 200 },
		);
	} catch (error) {
		await client.query('ROLLBACK');
		throw error;
	} finally {
		client.release();
	}
}
