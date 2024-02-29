import cloudinary, { ResponseCallback } from 'cloudinary';
import { expect, test, vi } from 'vitest';

import { sendEmail, testSend } from '@/actions/sendEmail';

// Mock the cloudinary module
vi.spyOn(cloudinary.v2.api, 'resource').mockImplementation(
	(identifier: string, callback: ResponseCallback | undefined) => {
		return new Promise((resolve, reject) => {
			if (identifier === 'invalid-folder/John_Doe') {
				if (callback) {
					callback(
						{ message: 'Invalid Cloudinary resource', status: 404 },
						null,
					);
				}
			} else {
				if (callback) {
					callback(null, { secure_url: 'https://www.example.com/image.jpg' });
				}
			}
		});
	},
);

// Mock the apiInstance module
vi.mock('@/lib/brevo', () => ({
	apiInstance: {
		sendTransacEmail: vi.fn(() => Promise.resolve('mocked-data')),
	},
	sendSmtpEmail: {
		subject: '',
		htmlContent: '',
		sender: { name: '', email: '' },
		to: [{ email: '', name: '' }],
		replyTo: { name: '', email: '' },
		attachment: [],
	},
}));

test('sendEmail should send a transactional email successfully', async () => {
	const result = await sendEmail();
	expect(result.message).toBe('API called successfully');
});

/**
 * Todo: testSend has client-side code that needs to be tested
 */
test.todo(
	'testSend should send an email with attachment successfully',
	async () => {
		const params = {
			email: 'johndoe@example.com',
			firstName: 'Francois',
			lastName: 'Polo',
			folder: '2023',
			secure_url: 'https://www.example.com/image.jpg',
		};

		const result = await testSend(params);

		expect(result.message).toBe(
			`Email sent to ${params.email} with attachment url: ${params.secure_url}`,
		);
		expect(result.status).toBe(250);
	},
);

/**
 * Todo: testSend has client-side code that needs to be tested
 */
test.todo('testSend should handle invalid Cloudinary resource', async () => {
	const params = {
		email: '',
		firstName: 'John',
		lastName: 'Doe',
		folder: 'invalid-folder',
	};

	try {
		await testSend(params);
	} catch (error) {
		const err = error as { message: string; status: number };
		expect(err.message).toBe('Invalid Cloudinary resource');
		expect(err.status).toBe(404);
	}
});
