import { RowModel } from '@tanstack/react-table';
import * as React from 'react';

import { useToast } from '@/components/ui/use-toast';

import { editStatusColumn, sendBulkEmail } from '@/actions/sendBulkEmail';
import { useRecipientStore } from '@/store/recipientStore';
import { config } from '@/utils/config';
import { mapSelectedRows } from '@/utils/mapSelectedRows';
import type { Recipient } from '../_data/schema';

export interface DataTableFacetedFilterProps<TData, TValue> {
	title?: string;
	options: {
		label: string;
		value: string;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
	someRowsSelected: boolean;
	selectedRows: RowModel<TData>;
}

async function sendEmail(mappedSelectedRows?: Recipient[]) {
	if (mappedSelectedRows) {
		const recipients = mappedSelectedRows.map((row) => {
			return {
				organizationId: row.organizationId,
				email: row.email,
				firstName: row.firstName,
				lastName: row.lastName,
				identifier: row.identifier,
			};
		});
		return await sendBulkEmail(recipients);
	}
}

type BulkEmailResponse = {
	message: string;
	resource: {
		organizationId: string;
		email: string;
		firstName: string;
		lastName: string;
	};
	status: number;
};

type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

async function editStatusColumnAPI(recipients: string[]) {
	try {
		const result = await editStatusColumn(recipients);

		return result;
	} catch (error) {
		console.log(error);
	}
}

export function useBulkFilter<TData>(selectedRows: RowModel<TData>) {
	const [selectedOption, setSelectedOption] = React.useState<string | null>(
		null,
	);
	const [open, setOpen] = React.useState(false);
	const [openPrompt, setOpenPrompt] = React.useState(false);
	const [batchAmount, setBatchAmount] = React.useState(0);

	const editStatusById = useRecipientStore((state) => state.editStatusById);
	const recipientsInIdle = useRecipientStore(
		(state) => state.getRecipientsInIdle,
	);
	const { toast } = useToast();

	React.useEffect(() => {
		if (!open) setSelectedOption(null);
	}, [open]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		if (batchAmount) {
			const recipients = recipientsInIdle();
			const batch = recipients.slice(0, batchAmount);

			toast({
				title: 'Email sending',
				description: `Sending ${batchAmount} emails in progress.`,
				variant: 'info',
			});

			sendEmail(batch).then((response) => {
				const responseBatch = response as BulkEmailResponse[];
				const successfulBatch = responseBatch?.filter(
					(res) => res.status === 200,
				);

				const organizationIds = successfulBatch?.map(
					(res) => res.resource.organizationId,
				);

				/**
				 * Update the status of the recipients in the database
				 */
				editStatusColumnAPI(organizationIds).then((result) => {
					if (result) {
						/**
						 * Update the status of the recipients in the store
						 */
						for (const ele of successfulBatch) {
							editStatusById(ele.resource.organizationId, 'sent');
						}

						toast({
							title: 'Email sent',
							description: `Successfully sent ${successfulBatch?.length} emails.`,
						});
					} else {
						toast({
							title: 'Email sent failed',
							description: 'Failed to update the status of the recipients.',
						});
					}
				});

				setBatchAmount(0);
			});
		}
	}, [batchAmount]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const handleSubmit = React.useCallback(() => {
		if (!selectedOption) {
			return;
		}

		if (selectedOption === 'selected') {
			const mappedSelectedRows = mapSelectedRows(selectedRows) as Recipient[];
			sendEmail(mappedSelectedRows).then((response) => {
				console.log(response);
				// if (response?.status === 200) {
				// 	toast({
				// 		title: "Email sent",
				// 		description: response.message,
				// 	});
				// 	for (const id of response.resource || []) {
				// 		editStatusById(id, "sent");
				// 	}
				// }
			});
		}

		if (selectedOption === 'all') {
			setOpenPrompt(true);
		}

		setOpen(false);
	}, [selectedOption, selectedRows, toast]);

	return {
		selectedOption,
		setSelectedOption,
		open,
		setOpen,
		openPrompt,
		setOpenPrompt,
		setBatchAmount,
		handleSubmit,
	};
}
