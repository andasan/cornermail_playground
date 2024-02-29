'use client';

import { DateRangePickerValue } from '@tremor/react';
import { differenceInDays } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';

/**
 * Disabled for demo purposes
 */
// import { getAggregatedReportPerDay } from "@/actions/getAggregatedReportPerDay";
import type { ChartData, GenerateData } from '../_types';

const dateMap = (from: Date, to: Date, chartdata: ChartData[]) => {
	const days = Math.abs(differenceInDays(to, from)) ?? 1;

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

const generateData: GenerateData = (dates, chartdata) => {
	const [_1, _2, selectedValue] = dates;

	/**
	 * tdy: today
	 * w: 7 days
	 * t: last 30 days
	 * m: this month
	 * y: this year
	 */

	switch (selectedValue) {
		case 'tdy':
			return dateMap(new Date(), new Date(), chartdata);
		case 'w':
			return dateMap(
				new Date(new Date().setDate(new Date().getDate() - 7)),
				new Date(),
				chartdata,
			);
		case 't':
			return dateMap(
				new Date(new Date().setDate(new Date().getDate() - 30)),
				new Date(),
				chartdata,
			);
		case 'm':
			return dateMap(
				new Date(new Date().getFullYear(), new Date().getMonth(), 1),
				new Date(),
				chartdata,
			);
		case 'y':
			return dateMap(
				new Date(new Date().getFullYear(), 0, 1),
				new Date(),
				chartdata,
			);
		default: {
			return dateMap(dates[0] as Date, dates[1] as Date, chartdata);
		}
	}
};

export default function UseDashBoard() {
	const [dateRange, setDateRange] = useState<DateRangePickerValue>({
		from: new Date(new Date().setDate(new Date().getDate() - 7)),
		to: new Date(),
		selectValue: 'w',
	});
	const [chartdata, setChartData] = useState<ChartData[]>([]);
	const [records, setRecords] = useState<ChartData[]>([]);
	const [aggregate, setAggregate] = useState<Omit<ChartData, 'name'>>({
		Sent: 0,
		Opened: 0,
		Bounced: 0,
	});

	const fakeAggregatedReportPerDay = useCallback(
		({
			_startDate,
			_endDate,
		}: {
			_startDate: Date;
			_endDate: Date;
		}) => {
			const dates = Math.abs(differenceInDays(_startDate, _endDate)) ?? 1;

			const dateArray = Array.from(
				{ length: (dates as number) + 1 },
				(_, i) => {
					const date = new Date(_startDate.getTime());
					date.setDate((date.getDate() ?? 0) + i);
					return date;
				},
			);

			return Promise.resolve(
				dateArray.map((date) => {
					const day = date.getDate();
					return {
						name: `${day}/${`0${date.getMonth() + 1}`.slice(-2)}`,
						Sent: Math.floor(Math.random() * 100),
						Opened: Math.floor(Math.random() * 100),
						Bounced: Math.floor(Math.random() * 100),
					};
				}),
			);
		},
		[],
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		/**
		 * Disabled for demo purposes
		 */
		// getAggregatedReportPerDay({
		// 	_startDate: dateRange.from as Date,
		// 	_endDate: dateRange.to as Date,
		// }).then((data) => {
		// 	const brevoData = data as ChartData[];
		// 	setRecords(generateData(dates, brevoData));
		// 	setChartData(brevoData);
		// });

		fakeAggregatedReportPerDay({
			_startDate: dateRange.from as Date,
			_endDate: dateRange.to as Date,
		}).then((data) => {
			const brevoData = data as ChartData[];
			setRecords(
				generateData(
					[dateRange.from, dateRange.to, dateRange.selectValue],
					brevoData,
				),
			);
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
