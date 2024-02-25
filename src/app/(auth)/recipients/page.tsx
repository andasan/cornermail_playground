import Search from '@/app/(auth)/recipients/_components/search';
import UsersTable from '@/app/(auth)/recipients/_components/table';
import { Card, Text, Title } from '@tremor/react';
import { sql } from '@vercel/postgres';

interface User {
	id: number;
	name: string;
	username: string;
	email: string;
}

export default async function RecipientsPage({
	searchParams,
}: {
	searchParams: { q: string };
}) {
	const search = searchParams.q ?? '';
	const result = await sql`
    SELECT id, name, username, email
    FROM users
    WHERE name ILIKE ${`%${search}%`};
  `;
	const users = result.rows as User[];

	return (
		<main className="p-4 md:p-10 mx-auto max-w-7xl">
			<Title>Users</Title>
			<Text>A list of users retrieved from a Postgres database.</Text>
			<Search />
			<Card className="mt-6">
				<UsersTable users={users} />
			</Card>
		</main>
	);
}
