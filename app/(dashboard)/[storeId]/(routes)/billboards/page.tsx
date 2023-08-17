import BillboardClient from '@/components/BillboardClient';
import prismadb from '@/lib/prismadb';
import { BillboardColumn } from './columns';
import { format } from 'date-fns';

export default async function Page({ params }: { params: { storeId: string } }) {
	const billboards = await prismadb.billboard.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedBillboard: BillboardColumn[] = billboards.map((billboard) => ({
		id: billboard.id,
		label: billboard.label,
		createdAt: format(billboard.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<BillboardClient data={formattedBillboard} />
			</div>
		</div>
	);
}
