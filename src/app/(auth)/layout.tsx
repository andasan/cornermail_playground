import { Suspense } from "react";

import "@/app/globals.css";

import Nav from "@/app/(auth)/_components/navigation/nav";
import Toast from "@/components/cookiesBanner/toast";
import { Analytics } from "@vercel/analytics/react";
import Loading from "./loading";

export const metadata = {
	title: "CornerMail",
	description:
		"A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="h-full bg-gray-50 dark:bg-gray-950">
			<body className="h-full">
				<Suspense fallback={<Loading />}>
					<Nav />
					{children}
					{/* <Analytics />
					<Toast /> */}
				</Suspense>
			</body>
		</html>
	);
}
