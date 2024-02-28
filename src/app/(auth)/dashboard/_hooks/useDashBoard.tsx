'use client';

import { DateRangePickerValue } from '@tremor/react';
import { intervalToDuration } from 'date-fns';
import { useEffect, useState } from 'react';

import { getAggregatedReportPerDay } from '@/actions/getAggregatedReportPerDay';
import type { ChartData, GenerateData } from '../_types';

const generateData: GenerateData = (dates, chartdata) => {
	const [from, to] = dates;
	const days = intervalToDuration({ start: from ?? 0, end: to ?? 0 }).days;

	const dateArray = Array.from({ length: (days as number) + 1 }, (_, i) => {
		const date = new Date(from?.getTime() ?? 0);
		date.setDate((date.getDate() ?? 0) + i);
		return date;
	});

	return dateArray.map((date) => {
		const day = date.getDate();
		const data = chartdata.find(
			(d) => d.name === `${day}/${`0${date.getMonth() + 1}`.slice(-2)}`,
		);
		if (data) return data;
		return {
			name: `${day}/${date.getMonth() + 1}`,
			Sent: 0,
			Opened: 0,
			Bounced: 0,
		};
	});
};

export default function UseDashBoard() {
	const [dateRange, setDateRange] = useState<DateRangePickerValue>({
		from: new Date(new Date().setDate(new Date().getDate() - 7)),
		to: new Date(),
	});
	const [chartdata, setChartData] = useState<ChartData[]>([]);
	const [records, setRecords] = useState<ChartData[]>([]);
	const [aggregate, setAggregate] = useState<Omit<ChartData, 'name'>>({
		Sent: 0,
		Opened: 0,
		Bounced: 0,
	});

	useEffect(() => {
		const dates = [dateRange.from, dateRange.to];

		getAggregatedReportPerDay({
			_startDate: dateRange.from as Date,
			_endDate: dateRange.to as Date,
		}).then((data) => {
			const brevoData = data as ChartData[];
			setRecords(generateData(dates, brevoData));
			setChartData(brevoData);
		});
	}, [dateRange]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const updatedChartData = chartdata.map(({ name, ...rest }) => rest);
		const aggregate = updatedChartData.reduce(
			(acc, cur) => {
				acc.Sent += cur.Sent;
				acc.Opened += cur.Opened;
				acc.Bounced += cur.Bounced;
				return acc;
			},
			{ Sent: 0, Opened: 0, Bounced: 0 },
		);
		setAggregate(aggregate);
	}, [records]);

	return {
		aggregate,
		records,
		dateRange,
		setDateRange,
	};
}
