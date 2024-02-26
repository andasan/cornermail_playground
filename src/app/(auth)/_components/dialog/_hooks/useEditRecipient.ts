import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
	firstName: z.string().min(2).max(50),
	lastName: z.string().min(2).max(50),
	email: z.string().email(),
	batch: z.coerce.number(),
	status: z.string(),
});

type Recipient = z.infer<typeof formSchema>;

export type EditRecipientProps = {
	recipient: Recipient;
	setOpen: (open: boolean) => void;
};

export default function UseEditRecipient({
	recipient,
	setOpen,
}: EditRecipientProps) {
	const { status, batch, firstName, lastName, email } = recipient;

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

	function onSubmit(values: Recipient) {
		// console.log(values);
		setOpen(false);
	}

	return { form, onSubmit };
}
