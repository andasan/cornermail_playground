'use client';

import { MantineProvider } from '@mantine/core';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import * as React from 'react';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return (
		<MantineProvider>
			<NextThemesProvider {...props}>{children}</NextThemesProvider>
		</MantineProvider>
	);
}
