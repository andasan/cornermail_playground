import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
	await page.goto('http://localhost:3000');

	// if (testInfo.title.includes("[auth]")) {
	// }

	await page.click('text=Sign in');
	await expect(page).toHaveURL(/dashboard/);
	await expect(page).toHaveTitle(/Dashboard/);
});

test("has 'Analytics Overview' title", async ({ page }) => {
	const $dashboardTitle = page.getByTestId('dashboard-title');
	await expect($dashboardTitle).toBeVisible();
});

test('can click through to recipients page', async ({ page }) => {
	const recipientsLink = page.getByRole('link', { name: 'Recipients' });

	await recipientsLink.click();

	const $recipientsTitle = page.getByRole('heading', { name: 'Recipients' });

	await expect(page).toHaveTitle(/Recipients/);
	await expect(page).toHaveURL(/recipients/);
	await expect($recipientsTitle).toBeVisible();
});

test('can click through to email template page', async ({ page }) => {
	const emailTemplateLink = page.getByRole('link', { name: 'Emails' });

	await emailTemplateLink.click();

	await expect(page).toHaveTitle(/Email Template/);
	await expect(page).toHaveURL(/emails/);
});
