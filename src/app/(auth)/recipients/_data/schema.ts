import { z } from 'zod';

export const recipientSchema = z.object({
	organizationId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	status: z.string(),
	batch: z.number(),
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
});

export type Recipient = z.infer<typeof recipientSchema>;
