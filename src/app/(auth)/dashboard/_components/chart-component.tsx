'use client';

import { Tab } from '@headlessui/react';
import { TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';

import useDashBoard from '../_hooks/useDashBoard';
import BarChart from './barchart';
import DateRange from './daterange';

export default function ChartComponent() {
	const { records, dateRange, setDateRange, aggregate } = useDashBoard();

	return (
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
	);
}
