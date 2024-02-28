import { config } from '@/utils/config';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const result = await sql`CREATE TABLE ${config.databaseTable} (
        FirstName varchar(255),
        LastName varchar(255),
        Email varchar(255),
        Batch int,
        Status varchar(255),
        OrganizationId varchar(255),
        Identifier varchar(255),
        CreatedAt timestamp,
        UpdatedAt timestamp
      );`;
		return NextResponse.json({ result }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
