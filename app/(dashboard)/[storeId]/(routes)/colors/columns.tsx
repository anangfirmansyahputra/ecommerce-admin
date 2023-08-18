'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';
import toast from 'react-hot-toast';

export type ColorColumn = {
	id: string;
	name: string;
	value: string;
	createdAt: string;
};

const onCopy = (color: string) => {
	navigator.clipboard.writeText(color);
	toast.success('Color copied to the clipboard');
};

export const columns: ColumnDef<ColorColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'value',
		header: 'Value',
		cell: ({ row }) => (
			<div className='flex gap-2 items-center'>
				<div
					onClick={() => onCopy(row.original.value)}
					style={{
						backgroundColor: row.original.value,
					}}
					className={`p-4 rounded-full border cursor-pointer`}
				></div>
				{row.original.value}
			</div>
		),
	},
	{
		accessorKey: 'createdAt',
		header: 'Date',
	},
	{
		id: 'action',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
