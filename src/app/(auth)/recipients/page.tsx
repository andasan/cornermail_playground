import { promises as fs } from 'fs';
import path from 'path';
import { Metadata } from 'next';
import { z } from 'zod';

import { columns } from './_components/data-table/columns';
import { DataTable } from './_components/table';
import { recipientSchema } from './_data/schema';

export const metadata: Metadata = {
	title: 'Recipients',
	description: 'A recipients and status tracker for transactional emails.',
};

// Simulate a database read for tasks.
async function getRecipients() {
	const data = await fs.readFile(
		path.join(
			process.cwd(),
			'/src/app/(auth)/recipients/_data/recipients.json',
		),
	);

	const recipients = JSON.parse(data.toString());

	return z.array(recipientSchema).parse(recipients);
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
