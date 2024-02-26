import { z } from 'zod';

export const recipientSchema = z.object({
	id: z.string(),
	studentId: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	status: z.string(),
	batch: z.number(),
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
});

export type Task = z.infer<typeof recipientSchema>;
