import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

import { statuses } from './data';

const recipients = Array.from({ length: 100 }, () => ({
	id: `RECIPIENT-${faker.number.int({ min: 1000, max: 9999 })}`,
	studentId: `STUDENT-${faker.number.int({ min: 1000, max: 9999 })}`,
	createdAt: faker.date.past(),
	updatedAt: faker.date.recent(),
	status: faker.helpers.arrayElement(statuses).value,
	batch: faker.number.int({ min: 2023, max: 2024 }),
	firstName: faker.person.firstName(),
	lastName: faker.person.lastName(),
	email: faker.internet.email(),
}));

fs.writeFileSync(
	path.join(__dirname, 'recipients.json'),
	JSON.stringify(recipients, null, 2),
);

console.log('✅ Tasks data generated.');
