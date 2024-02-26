'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge, badgeVariants } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

import { statuses } from '@/app/(auth)/recipients/_data/data';
import { Task } from '@/app/(auth)/recipients/_data/schema';
import { cn } from '@/lib/utils';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<Task>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'studentId',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Student ID" />
		),
		cell: ({ row }) => (
			<div className="w-[80px]">{row.getValue('studentId')}</div>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'firstName',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="First Name" />
		),
		cell: ({ row }) => (
			<div className="w-[200px]">{row.getValue('firstName')}</div>
		),
	},
	{
		accessorKey: 'lastName',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Last Name" />
		),
		cell: ({ row }) => (
			<div className="w-[200px]">{row.getValue('lastName')}</div>
		),
	},
	{
		accessorKey: 'email',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
		cell: ({ row }) => <div className="w-[200px]">{row.getValue('email')}</div>,
	},
	{
		accessorKey: 'batch',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Batch" />
		),
		cell: ({ row }) => <div className="w-[100px]">{row.getValue('batch')}</div>,
	},
	{
		accessorKey: 'status',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
			const status = statuses.find(
				(status) => status.value === row.getValue('status'),
			);

			const variant =
				status?.label === 'Bounced'
					? 'destructive'
					: status?.label === 'Sent'
					  ? undefined
					  : 'outline';

			if (!status) {
				return null;
			}

			return (
				<div
					className={cn(
						'flex w-[100px] items-center',
						badgeVariants({ variant }),
					)}
				>
					{status.icon && (
						<status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
					)}
					<span>{status.label}</span>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];
