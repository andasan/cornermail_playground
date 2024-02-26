import '@/app/globals.css';

import { Drawer } from '@/components/ui/drawer';

import Nav from '@/app/(auth)/_components/navigation/nav';
import Toast from '@/components/cookiesBanner/toast';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import { Suspense } from 'react';
import UploadDrawer from './_components/drawer/upload-drawer';
import Loading from './dashboard/loading';

export const metadata = {
	title: 'CornerMail',
	description:
		'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Drawer>
						<Nav />
						<Suspense fallback={<Loading />}>{children}</Suspense>
						{/* <Analytics />
					<Toast /> */}
						<UploadDrawer />
					</Drawer>
				</ThemeProvider>
			</body>
		</html>
	);
}
