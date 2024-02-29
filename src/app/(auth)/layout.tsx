import '@/app/globals.css';

import { Drawer } from '@/components/ui/drawer';
import { Toaster } from '@/components/ui/toaster';

import Nav from '@/app/(auth)/_components/navigation/nav';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Suspense } from 'react';
import UploadDrawer from './_components/drawer/upload-drawer';
import Loading from './dashboard/loading';

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
						<UploadDrawer />
						<Toaster />
					</Drawer>
				</ThemeProvider>
			</body>
		</html>
	);
}
