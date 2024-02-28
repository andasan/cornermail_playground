import { format } from 'date-fns';
import { NextResponse } from 'next/server';

import { pool } from '@/lib/pg';
import { config } from '@/utils/config';

export async function POST(request: Request) {
	const res = await request.json();
	const client = await pool.connect();

	const { firstName, lastName, email, batch, organizationId } = res;

	const status = 'idle';
	const createdAt = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
	const updatedAt = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

	try {
		if (!firstName || !lastName || !email || !batch || !organizationId)
			throw new Error('Recipient details required');

		await client.query('BEGIN');
		await client.query(
			`
			INSERT INTO ${client.escapeIdentifier(config.databaseTable)} (
        FirstName,
        LastName,
        Email,
        Batch,
        Status,
        OrganizationId,
        Identifier,
        CreatedAt,
        UpdatedAt
        ) VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8
        );`,
			[
				firstName,
				lastName,
				email,
				batch,
				status,
				organizationId,
				createdAt,
				updatedAt,
			],
		);

		await client.query('COMMIT');
	} catch (error) {
		await client.query('ROLLBACK');
		return NextResponse.json({ error }, { status: 500 });
	} finally {
		client.release();
	}

	const recipient = await client.query(
		`SELECT * FROM ${client.escapeIdentifier(config.databaseTable)};`,
	);
	return NextResponse.json({ recipient }, { status: 200 });
}
