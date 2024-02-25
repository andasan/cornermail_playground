import { BarChart } from '@tremor/react';
import { ChartData } from '../_types';

const categories = ['Sent', 'Opened', 'Bounced'];

const dataFormatter = (number: number) =>
	Intl.NumberFormat('us').format(number).toString();

export default function BarChartExampleWithGroups({
	records,
}: { records: ChartData[] }) {
	return (
		<>
			<BarChart
				className="mt-6"
				data={records}
				index="name"
				categories={categories}
				colors={['emerald', 'blue', 'rose']}
				valueFormatter={dataFormatter}
				yAxisWidth={48}
			/>
		</>
	);
}
