import { sql } from '@vercel/postgres';
import { format } from 'date-fns';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
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
		console.log(error);
		return NextResponse.json({ error }, { status: 500 });
	}

	// Assuming we want to retrieve the updated recipient
	const updatedRecipient = await sql`
		SELECT
			firstname as "firstName",
			lastname as "lastName",
			email,
			batch,
			status,
			organizationid as "organizationId",
			createdat as "createdAt",
			updatedat as "updatedAt"
		FROM recipients WHERE organizationId = ${res.organizationId};`;

	return NextResponse.json(
		{ recipient: updatedRecipient.rows[0] },
		{ status: 200 },
	);
}
