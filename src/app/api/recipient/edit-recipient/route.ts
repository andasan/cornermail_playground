import { sql } from '@vercel/postgres';
import { format } from 'date-fns';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
	const res = await request.json();

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

		await sql`
            UPDATE Recipients
            SET
                FirstName = ${firstName},
                LastName = ${lastName},
                Email = ${email},
                Batch = ${batch},
                Status = ${status},
                OrganizationId = ${organizationId},
                UpdatedAt = ${updatedAt}
            WHERE
                organizationId = ${res.organizationId};
        `;
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}

	// Assuming we want to retrieve the updated recipient
	const updatedRecipient =
		await sql`SELECT * FROM Recipients WHERE id = ${res.id};`;

	return NextResponse.json({ recipient: updatedRecipient }, { status: 200 });
}
