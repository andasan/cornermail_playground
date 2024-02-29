export type ChartData = {
	name: string;
	Sent: number;
	Opened: number;
	Bounced: number;
};

export type GenerateData = (
	dates: [Date | undefined, Date | undefined, string | undefined],
	chartData: ChartData[],
) => ChartData[];
