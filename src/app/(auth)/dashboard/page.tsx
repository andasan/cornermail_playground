import { Card, Title } from '@tremor/react';

import { Suspense } from 'react';
import ChartComponent from './_components/chart-component';
import Statistics from './_components/statistics';
import { LoadingStatistics } from './loading';

export default async function DashboardPage() {
	return (
		<main className="p-4 md:p-10 mx-auto max-w-7xl">
			<Title>Analytics Overview</Title>
			<Suspense fallback={<LoadingStatistics />}>
				<Statistics />
			</Suspense>

			<Card className="mt-8 mx-auto">
				<h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
					Email Statistics
				</h3>
				<p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
					Summary of email performance
				</p>
				<Suspense fallback={<LoadingStatistics />}>
					<ChartComponent />
				</Suspense>
			</Card>
		</main>
	);
}
