import { pool } from '@/lib/pg';
import { config } from '@/utils/config';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const client = await pool.connect();

	try {
		await client.query('BEGIN');
		const result = await client.query(
			`
      CREATE TABLE ${client.escapeIdentifier(config.databaseTable)} (
      FirstName varchar(255),
      LastName varchar(255),
      Email varchar(255),
      Batch int,
      Status varchar(255),
      OrganizationId varchar(255),
      Identifier varchar(255),
      CreatedAt timestamp,
      UpdatedAt timestamp
    	);`,
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
