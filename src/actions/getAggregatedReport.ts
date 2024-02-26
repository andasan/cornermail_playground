'use server';

import { format } from 'date-fns';

import { apiInstance } from '@/lib/brevo';

type AggregatedReportProps = {
	_startDate: Date;
	_endDate: Date;
};

export async function getAggregatedReport({
	_startDate,
	_endDate,
}: AggregatedReportProps) {
	const startDate = format(new Date(_startDate), 'yyyy-MM-dd');
	const endDate = format(new Date(_endDate), 'yyyy-MM-dd');

	return apiInstance
		.getAggregatedSmtpReport(startDate, endDate)
		.then((data) => ({
			message: 'API called successfully',
			data,
			code: 200,
		}));
}
