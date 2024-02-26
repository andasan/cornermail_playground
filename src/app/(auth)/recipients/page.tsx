// import Search from '@/app/(auth)/recipients/_components/search';
// import UsersTable from '@/app/(auth)/recipients/_components/table';
// import { Card, Text, Title } from '@tremor/react';
// import { sql } from '@vercel/postgres';

// interface User {
// 	id: number;
// 	name: string;
// 	username: string;
// 	email: string;
// }

// export default async function RecipientsPage({
// 	searchParams,
// }: {
// 	searchParams: { q: string };
// }) {
// 	const search = searchParams.q ?? '';
// 	const result = await sql`
//     SELECT id, name, username, email
//     FROM users
//     WHERE name ILIKE ${`%${search}%`};
//   `;
// 	const users = result.rows as User[];

// 	return (
// 		<main className="p-4 md:p-10 mx-auto max-w-7xl">
// 			<Title>Users</Title>
// 			<Text>A list of users retrieved from a Postgres database.</Text>
// 			<Search />
// 			<Card className="mt-6">
// 				<UsersTable users={users} />
// 			</Card>
// 		</main>
// 	);
// }

import { promises as fs } from 'fs';
import path from 'path';
import { Metadata } from 'next';
import Image from 'next/image';
import { z } from 'zod';

import { columns } from './_components/data-table/columns';
import { UserNav } from './_components/data-table/user-nav';
import { DataTable } from './_components/table';
import { taskSchema } from './_data/schema';

export const metadata: Metadata = {
	title: 'Tasks',
	description: 'A task and issue tracker build using Tanstack Table.',
};

// Simulate a database read for tasks.
async function getTasks() {
	const data = await fs.readFile(
		path.join(process.cwd(), '/src/app/(auth)/recipients/_data/tasks.json'),
	);

	const tasks = JSON.parse(data.toString());

	return z.array(taskSchema).parse(tasks);
}

export default async function RecipientsPage() {
	const tasks = await getTasks();

	return (
		<main className="p-4 md:p-10 mx-auto max-w-7xl">
			<div className="h-full flex-1 flex-col space-y-8 py-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
						<p className="text-muted-foreground">
							Here&apos;s a list of your tasks for this month!
						</p>
					</div>
					<div className="flex items-center space-x-2">
						<UserNav />
					</div>
				</div>
				<DataTable data={tasks} columns={columns} />
			</div>
		</main>
	);
}
