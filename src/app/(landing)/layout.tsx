import "@/app/globals.css";

import Nav from "@/app/(auth)/_components/navigation/nav";
import Footer from "@/app/(landing)/_components/layout/footer";
import Header from "@/app/(landing)/_components/layout/header";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import Toast from "../../components/cookiesBanner/toast";

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
		<html lang="en">
			<body className="bg-white dark:bg-gray-900">
				<Suspense>
					{/* <Header /> */}
					{children}
					<Footer />
					<Analytics />
				</Suspense>
				{/* <Toast /> */}
			</body>
		</html>
	);
}
