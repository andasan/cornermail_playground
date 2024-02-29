import '@/app/globals.css';

import Footer from '@/app/(landing)/_components/layout/footer';
import Header from '@/app/(landing)/_components/layout/header';
import Toast from '@/components/cookiesBanner/toast';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Suspense } from 'react';

export const metadata = {
	title: 'CornerMail',
	description:
		'A web application for transactional emails and recipient management.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="bg-white dark:bg-gray-900">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Suspense>
						<Header />
						{children}
						<Footer />
					</Suspense>
					<Toast />
				</ThemeProvider>
			</body>
		</html>
	);
}
