import SizeForm from '@/components/SizeForm';
import prismadb from '@/lib/prismadb';

export default async function Page({ params }: { params: { sizeId: string; storeId: string } }) {
	const size = await prismadb.size.findUnique({
		where: {
			id: params.sizeId,
		},
	});

	const billboards = await prismadb.billboard.findMany({
		where: {
			storeId: params.storeId,
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<SizeForm initialData={size} />
			</div>
		</div>
	);
}
