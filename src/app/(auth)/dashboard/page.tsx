"use client";

import {
	Card,
	Tab,
	TabGroup,
	TabList,
	TabPanel,
	TabPanels,
} from "@tremor/react";

import { sendEmail, testSend } from "@/actions/brevo";
import Chart from "./_components/chart";
import Statistics from "./_components/statistics";

const website = [
	{ name: "/home", value: 1230 },
	{ name: "/contact", value: 751 },
	{ name: "/gallery", value: 471 },
	{ name: "/august-discount-offer", value: 280 },
	{ name: "/case-studies", value: 78 },
];

const shop = [
	{ name: "/home", value: 453 },
	{ name: "/imprint", value: 351 },
	{ name: "/shop", value: 271 },
	{ name: "/pricing", value: 191 },
];

const app = [
	{ name: "/shop", value: 789 },
	{ name: "/product-features", value: 676 },
	{ name: "/about", value: 564 },
	{ name: "/login", value: 234 },
	{ name: "/downloads", value: 191 },
];

const data = [
	{
		category: "Website",
		stat: "10,234",
		data: website,
	},
	{
		category: "Online Shop",
		stat: "12,543",
		data: shop,
	},
	{
		category: "Mobile App",
		stat: "2,543",
		data: app,
	},
];

export default function PlaygroundPage() {
	return (
		<main className="p-4 md:p-10 mx-auto max-w-7xl">
			<button
				type="button"
				onClick={async () => {
					const message = await sendEmail();
					console.log(message);
				}}
				className="mr-2 px-4 py-2 text-white bg-tremor-brand dark:bg-dark-tremor-brand"
			>
				SEND TEST EMAIL
			</button>
			<button
				type="button"
				onClick={async () => {
					try {
						const message = await testSend({
							email: "andasan@gmail.com",
							firstName: "Francois",
							lastName: "Polo",
						});
						console.log("success: ", message);
					} catch (e) {
						console.error("failed: ", e);
					}
				}}
				className="mr-2 px-4 py-2 text-white bg-tremor-brand dark:bg-dark-tremor-brand"
			>
				SEND TEST EMAIL WITH PDF
			</button>
			<Statistics />

			<Card className="mt-8 mx-auto">
				<h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
					Email Statistics
				</h3>
				<p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
					Summary of email performance
				</p>
				<TabGroup className="mt-6 p-1 border rounded-lg border-tremor-border dark:border-dark-tremor-border">
					<TabList
						variant="line"
						className="text-tremor-default bg-tremor-background dark:bg-dark-tremor-background"
					>
						<Tab className="py-4 pl-5 pr-12 text-left">
							<span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
								Sent
							</span>
							<span className="block text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
								1900
							</span>
						</Tab>
						<Tab className="py-4 pl-5 pr-12 text-left">
							<span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
								Opened
							</span>
							<span className="block text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
								1900
							</span>
						</Tab>
						<Tab className="py-4 pl-5 pr-12 text-left">
							<span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
								Bounced
							</span>
							<span className="block text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
								1900
							</span>
						</Tab>
					</TabList>

					<TabPanels className="mt-0">
						<TabPanel className="mt-0">{/* <Chart /> */}</TabPanel>
						<TabPanel className="mt-0">{/* <Chart /> */}</TabPanel>
						<TabPanel className="mt-0">{/* <Chart /> */}</TabPanel>
					</TabPanels>
				</TabGroup>
			</Card>
		</main>
	);
}
