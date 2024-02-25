import { Card, TabGroup } from '@tremor/react';

type StatisticsProps = {
	aggregate: {
		Sent: number;
		Opened: number;
		Bounced: number;
	};
};

function getUsage({ aggregate }: StatisticsProps) {
	const percentageOpened = ((aggregate.Opened / aggregate.Sent) * 100).toFixed(
		2,
	);
	const percentageBounced = (
		(aggregate.Bounced / aggregate.Sent) *
		100
	).toFixed(2);
	const percentageClicked = (
		((aggregate.Opened - aggregate.Bounced) / aggregate.Sent) *
		100
	).toFixed(2);
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
			resource: 'Click-Through Rate',
			usage: percentageClicked,
		},
	];
}

export default function Statistics({ aggregate }: StatisticsProps) {
	const usage = getUsage({ aggregate });

	return (
		<TabGroup>
			<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{usage.map((item) => (
					<Card
						key={item.id}
						className="p-4 hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted"
					>
						<p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
							<span className="absolute inset-0" aria-hidden={true} />
							{item.resource}
						</p>
						<p className="mt-3 flex items-end">
							<span className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
								{item.usage}
							</span>
							<span className="font-semibold text-tremor-content-subtle dark:text-dark-tremor-content-subtle">
								%
							</span>
						</p>
					</Card>
				))}
			</div>
		</TabGroup>
	);
}
