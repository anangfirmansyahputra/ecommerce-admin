import BillboardForm from '@/components/BillboardForm';
import CategoryForm from '@/components/CategoryForm';
import prismadb from '@/lib/prismadb';

export default async function Page({ params }: { params: { categoryId: string; storeId: string } }) {
	const categories = await prismadb.category.findUnique({
		where: {
			id: params.categoryId,
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
				<CategoryForm
					initialData={categories}
					billboards={billboards}
				/>
			</div>
		</div>
	);
}
