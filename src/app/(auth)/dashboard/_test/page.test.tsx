import { render, screen } from '@testing-library/react';
import {
	afterAll,
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest';

import Page from '@/app/(auth)/dashboard/page';

afterAll(() => {
	window.ResizeObserver = ResizeObserver;
	vi.restoreAllMocks();
});

beforeAll(() => {
	global.ResizeObserver = vi.fn().mockImplementation(() => ({
		observe: vi.fn(),
		unobserve: vi.fn(),
		disconnect: vi.fn(),
	}));

	render(<Page />);
});

describe('Dashboard page', () => {
	it('should render', () => {
		expect(screen.getByText('Analytics Overview')).toBeDefined();
	});

	it('should render email statistics heading', () => {
		expect(
			screen.getByRole('heading', { level: 3, name: 'Email Statistics' }),
		).toBeDefined();
	});
});
