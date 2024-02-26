export type ChartData = {
	name: string;
	Sent: number;
	Opened: number;
	Bounced: number;
};

export type GenerateData = (
	dates: (Date | undefined)[],
	chartData: ChartData[],
) => ChartData[];
