import type { GetAggregatedReport } from '@getbrevo/brevo';

/**
 * Disabled for demo purposes
 */
// import { getAggregatedReport } from '@/actions/getAggregatedReport';
import { Card, TabGroup } from '@tremor/react';

function getUsage(aggregate: GetAggregatedReport) {
	const percentageOpened =
		(((aggregate?.opens ?? 0) / (aggregate?.requests ?? 1)) * 100)?.toFixed(
			2,
		) || '0.00';
	const percentageBounced =
		(
			((aggregate?.hardBounces ?? 0) / (aggregate?.requests ?? 1)) *
			100
		)?.toFixed(2) || '0.00';
	const percentageDelivered = (
		((aggregate?.delivered ?? 0) / (aggregate?.requests ?? 1)) *
		100
	)?.toFixed(2);

	return [
		{
			id: 1,
			resource: 'Open Rate',
			usage: percentageOpened,
		},
		{
			id: 2,
			resource: 'Bounce Rate',
			usage: percentageBounced,
		},
		{
			id: 3,
			resource: 'Delivered Rate',
			usage: percentageDelivered,
		},
	];
}

function Usage({ resource, usage }: { resource: string; usage: string }) {
	return (
		<Card className="p-4 hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted">
			<p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
				<span className="absolute inset-0" aria-hidden={true} />
				{resource}
			</p>
			<p className="mt-3 flex items-end">
				<span className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
					{usage}
				</span>
				<span className="font-semibold text-tremor-content-subtle dark:text-dark-tremor-content-subtle">
					%
				</span>
			</p>
		</Card>
	);
}

export default async function Statistics() {
	/**
	 * Disabled for demo purposes
	 */
	// const aggregate = await getAggregatedReport({
	// 	_startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
	// 	_endDate: new Date(),
	// });

	const fakeRequests = Math.floor(Math.random() * 100);
	const fakeOpens = Math.floor(Math.random() * fakeRequests);
	const fakeBounce = fakeRequests - fakeOpens;

	const fakeAggregate = {
		data: {
			body: {
				requests: fakeRequests,
				delivered: Math.floor(Math.random() * fakeRequests),
				opens: fakeOpens,
				hardBounces: fakeBounce,
			},
		},
	};

	if (!fakeAggregate.data) {
		return (
			<div className="text-tremor-label text-tremor-brand-muted text-center italic bg-tremor-background-emphasis bg-opacity-30 rounded-lg my-3 py-5">
				Error Loading Statistics
			</div>
		);
	}

	const usage = getUsage(fakeAggregate.data.body);

	return (
		<TabGroup>
			<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{usage.map((item) => (
					<Usage key={item.id} resource={item.resource} usage={item.usage} />
				))}
			</div>
		</TabGroup>
	);
}
