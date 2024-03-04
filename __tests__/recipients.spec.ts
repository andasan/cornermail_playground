import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:3000');

	await page.click('text=Sign in');
	await expect(page).toHaveURL(/dashboard/);
	await expect(page).toHaveTitle(/Dashboard/);
});

test('can display edit profile dialog', async ({ page }) => {
	const recipientsLink = page.getByRole('link', { name: 'Recipients' });

	await recipientsLink.click();
	await expect(page).toHaveURL(/recipients/);

	const $editButton = page
		.getByRole('table')
		.locator('tbody')
		.locator('tr')
		.locator('td:last-child > button')
		.first();
	await $editButton.click();

	const $select = page.getByRole('menuitem', { name: 'Edit' });
	await $select.click();

	const $dialog = page.getByRole('dialog');
	await expect($dialog).toBeVisible();
});
