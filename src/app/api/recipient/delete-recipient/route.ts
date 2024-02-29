import { pool } from '@/lib/pg';
import { config } from '@/utils/config';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
	const client = await pool.connect();

	try {
		await client.query('BEGIN');
		const requestBody = await request.json();
		const orgId = requestBody?.id;
		if (!orgId) {
			throw new Error('Email is missing');
		}

		const result = await client.query(
			`
      DELETE FROM ${client.escapeIdentifier(config.databaseTable)}
      WHERE Organizationid = $1
      `,
			[orgId],
		);

		await client.query('COMMIT');

		return NextResponse.json({ result }, { status: 200 });
	} catch (error) {
		await client.query('ROLLBACK');
		return NextResponse.json({ error }, { status: 500 });
	} finally {
		client.release();
	}
}
