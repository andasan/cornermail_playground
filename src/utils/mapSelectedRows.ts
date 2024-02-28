import { RowModel } from '@tanstack/react-table';

export const mapSelectedRows = <TData>(selectedRows: RowModel<TData>) => {
	return selectedRows.rows.map((row) => row.original);
};
