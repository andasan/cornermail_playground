'use server';

import { apiInstance } from '@/lib/brevo';

import { pool } from '@/lib/pg';
import { config } from '@/utils/config';
import { QueryResult } from 'pg';

async function validateData(emails: string[]) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const promises = emails.map(async (email): Promise<QueryResult<any>[]> => {
		const client = await pool.connect();
		try {
			await client.query('BEGIN');
			const result = await client.query(
				`
							SELECT *
							FROM ${client.escapeIdentifier(config.databaseTable)}
							WHERE Email = $1`,
				[email],
			);

			await client.query('COMMIT');
			return result.rows;
		} catch (error) {
			await client.query('ROLLBACK');
			console.log(error);
			return [];
		} finally {
			client.release();
		}
	});
	const results = await Promise.all(promises);
	return results.filter((result) => result.length > 0);
}

export async function getBounced() {
	return apiInstance
		.getEmailEventReport(
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			'bounces',
		)
		.then(
			async (data) => {
				const bouncedData = data.body.events
					?.map((event) => event.email)
					.filter((email) => email);
				const uniqueEmails = Array.from(new Set(bouncedData));

				return await validateData(uniqueEmails);
			},
			(error) => {
				console.error(error);
				return error;
			},
		);
}
