'use client';

import {
	Card,
	Tab,
	TabGroup,
	TabList,
	TabPanel,
	TabPanels,
	Title,
} from '@tremor/react';

import BarChart from './_components/barchart';
import DateRange from './_components/daterange';
import Statistics from './_components/statistics';
import useDashBoard from './_hooks/useDashBoard';

export default function DashboardPage() {
	const { dateRange, setDateRange, records, aggregate } = useDashBoard();

	return (
		<main className="p-4 md:p-10 mx-auto max-w-7xl">
			<Title>Analytics Overview</Title>
			<Statistics aggregate={aggregate} />

			<Card className="mt-8 mx-auto">
				<h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
					Email Statistics
				</h3>
				<p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
					Summary of email performance
				</p>
				<TabGroup className="mt-6 p-1 border rounded-lg border-tremor-border dark:border-dark-tremor-border">
					<TabList
						variant="line"
						className="text-tremor-default bg-tremor-background dark:bg-dark-tremor-background"
					>
						<Tab className="py-4 pl-5 pr-12 text-left">
							<span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
								Sent
							</span>
							<span className="block text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
								{aggregate.Sent}
							</span>
						</Tab>
					</TabList>

					<TabPanels className="mt-0">
						<TabPanel className="mt-0">
							<DateRange dateRange={dateRange} setDateRange={setDateRange} />
							<BarChart records={records} />
						</TabPanel>
					</TabPanels>
				</TabGroup>
			</Card>
		</main>
	);
}
