import { Metadata } from 'next';
import { z } from 'zod';

import { pool } from '@/lib/pg';
import { config } from '@/utils/config';
import { columns } from './_components/data-table/columns';
import { DataTable } from './_components/table';
import { Recipient, recipientSchema } from './_data/schema';

export const metadata: Metadata = {
	title: 'Recipients',
	description: 'A recipients and status tracker for transactional emails.',
};

async function getRecipients() {
	const client = await pool.connect();

	try {
		await client.query('BEGIN');
		const result = await client.query(
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
				withAttachment as "withAttachment"
			FROM ${client.escapeIdentifier(config.databaseTable)}
			`,
		);

		await client.query('COMMIT');
		const recipients = result.rows as Recipient[];
		return z.array(recipientSchema).parse(recipients);
	} catch (error) {
		await client.query('ROLLBACK');
		throw error;
	} finally {
		client.release();
	}
}

export default async function RecipientsPage() {
	const recipients = await getRecipients();

	return (
		<main className="p-4 md:p-10 mx-auto max-w-7xl">
			<div className="h-full flex-1 flex-col space-y-8 py-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Recipients</h2>
						<p className="text-muted-foreground">
							Here&apos;s a list of recipients
						</p>
					</div>
				</div>
				<DataTable data={recipients} columns={columns} />
			</div>
		</main>
	);
}
