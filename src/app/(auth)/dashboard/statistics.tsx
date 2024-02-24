// 'use client';
import { RiExternalLinkLine } from "@remixicon/react";
import { Card, Tab, TabGroup, TabList } from "@tremor/react";

const usage = [
	{
		id: 1,
		resource: "Open Rate",
		usage: "145",
		maximum: "1,000",
		href: "#",
	},
	{
		id: 2,
		resource: "Bounce Rate",
		usage: "1.1",
		maximum: "10 GB",
		href: "#",
	},
	{
		id: 3,
		resource: "Click-Through Rate",
		usage: "10",
		maximum: "25",
		href: "#",
	},
];

export default function Statistics() {
	return (
		<TabGroup>
			<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{usage.map((item) => (
					<Card
						key={item.id}
						className="p-4 hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted"
					>
						<p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
							<a href={item.href} className="focus:outline-none">
								{/* extend link to entire card */}
								<span className="absolute inset-0" aria-hidden={true} />
								{item.resource}
							</a>
						</p>
						<p className="mt-3 flex items-end">
							<span className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
								{item.usage}
							</span>
							<span className="font-semibold text-tremor-content-subtle dark:text-dark-tremor-content-subtle">
								/{item.maximum}
							</span>
						</p>
					</Card>
				))}
			</div>
		</TabGroup>
	);
}
