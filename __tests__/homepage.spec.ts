import { Eyes, Target } from '@applitools/eyes-playwright';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:3000');
});

test('has title', async ({ page }) => {
	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/CornerMail/);

	const eyes = new Eyes();
	await eyes.open(page, 'CornerMail', 'Homepage');
	await eyes.check('Homepage', Target.window().fully());
	await eyes.close();
});
