import prismadb from '@/lib/prismadb';
import { format } from 'date-fns';
import { SizesColumn } from './columns';
import SizeClient from '@/components/SizeClient';

export default async function Page({ params }: { params: { storeId: string } }) {
	const sizes = await prismadb.size.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedSizes: SizesColumn[] = sizes.map((size) => ({
		id: size.id,
		name: size.name,
		value: size.value,
		createdAt: format(size.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<SizeClient data={formattedSizes} />
			</div>
		</div>
	);
}
