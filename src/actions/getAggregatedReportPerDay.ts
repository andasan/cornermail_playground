'use server';

import { format } from 'date-fns';

import { apiInstance } from '@/lib/brevo';

type AggregatedReportProps = {
	_startDate: Date;
	_endDate: Date;
};

export async function getAggregatedReportPerDay({
	_startDate,
	_endDate,
}: AggregatedReportProps) {
	const startDate = format(new Date(_startDate), 'yyyy-MM-dd');
	const endDate = format(new Date(_endDate), 'yyyy-MM-dd');

	const limit = 30;
	const offset = 0;

	try {
		const reportData = await apiInstance.getSmtpReport(
			limit,
			offset,
			startDate,
			endDate,
		);

		return reportData?.body?.reports?.map((report) => {
			return {
				name: format(new Date(report.date), 'dd/MM'),
				Sent: report.requests,
				Opened: report.opens,
				Bounced: report.hardBounces,
			};
		});
	} catch (error) {
		console.error(error);
	}
}
