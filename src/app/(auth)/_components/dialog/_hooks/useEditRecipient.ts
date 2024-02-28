import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useRecipientStore } from '@/store/recipientStore';

const formSchema = z.object({
	firstName: z.string().min(2).max(50),
	lastName: z.string().min(2).max(50),
	email: z.string().email(),
	batch: z.coerce.number(),
	status: z.string(),
});

type Recipient = z.infer<typeof formSchema>;

export type EditRecipientProps = {
	recipient: Recipient & { organizationId: string };
	setOpen: (open: boolean) => void;
};

async function editRecipientApi(
	recipient: Recipient & { organizationId: string },
) {
	try {
		const res = await fetch('/api/recipient/edit-recipient', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(recipient),
		});

		const data = await res.json();
		data.recipient.createdAt = new Date(data.recipient.createdAt);
		data.recipient.updatedAt = new Date(data.recipient.updatedAt);

		return data.recipient;
	} catch (error) {
		console.error(error);
		return error;
	}
}

export default function UseEditRecipient({
	recipient,
	setOpen,
}: EditRecipientProps) {
	const { editRecipient } = useRecipientStore();
	const { status, batch, firstName, lastName, email, organizationId } =
		recipient;

	const form = useForm<Recipient>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName,
			lastName,
			email,
			batch,
			status,
		},
	});

	async function onSubmit(values: Recipient) {
		const updatedRecipient = { ...values, organizationId };
		const response = await editRecipientApi(updatedRecipient);

		if (response.error) {
			console.error(response.error);
			return;
		}

		editRecipient(response);
		setOpen(false);
	}

	return { form, onSubmit };
}
