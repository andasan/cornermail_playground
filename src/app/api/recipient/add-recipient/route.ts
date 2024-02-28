import { config } from '@/utils/config';
import { sql } from '@vercel/postgres';
import { format } from 'date-fns';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const res = await request.json();

	const { firstName, lastName, email, batch, organizationId } = res;

	const status = 'idle';
	const createdAt = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
	const updatedAt = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

	try {
		if (!firstName || !lastName || !email || !batch || !organizationId)
			throw new Error('Recipient details required');

		await sql`INSERT INTO ${config.databaseTable} (
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
        ${firstName},
        ${lastName},
        ${email},
        ${batch},
        ${status},
        ${organizationId},
        ${createdAt},
        ${updatedAt}
      );`;
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}

	const recipient = await sql`SELECT * FROM ${config.databaseTable};`;
	return NextResponse.json({ recipient }, { status: 200 });
}
