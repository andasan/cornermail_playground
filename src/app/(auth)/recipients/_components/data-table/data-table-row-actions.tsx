'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { EditRecipient } from '@/app/(auth)/_components/dialog/edit-recipient';
import { recipientSchema } from '@/app/(auth)/recipients/_data/schema';
import { toast } from '@/components/ui/use-toast';
import { useRecipientStore } from '@/store/recipientStore';

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

async function deleteRecipientAPI(id: string) {
	const result = await fetch('/api/recipient/delete-recipient', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id }),
	});

	if (!result.ok) {
		throw new Error(`Error deleting recipient: ${id}`);
	}

	return result;
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const [open, setOpen] = useState(false);
	const recipient = recipientSchema.parse(row.original);
	const { deleteRecipient } = useRecipientStore();

	const handleDelete = (id: string) => {
		deleteRecipientAPI(id)
			.then(() => {
				deleteRecipient(id);
				toast({
					title: 'Recipient deleted',
					description: 'Recipient deleted successfully',
					duration: 5000,
				});
			})
			.catch((error) => {
				toast({
					title: 'Error deleting recipient',
					description: error.message,
					duration: 5000,
					variant: 'destructive',
				});
			});

		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
					>
						<DotsHorizontalIcon className="h-4 w-4" />
						<span className="sr-only">Open menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[160px]">
					<DialogTrigger asChild>
						<DropdownMenuItem>Edit</DropdownMenuItem>
					</DialogTrigger>
					<DropdownMenuItem>Send Email</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => handleDelete(recipient.organizationId)}
					>
						Delete
						<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<EditRecipient recipient={recipient} setOpen={setOpen} />
		</Dialog>
	);
}
