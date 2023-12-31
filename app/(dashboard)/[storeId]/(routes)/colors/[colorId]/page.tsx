import ColorForm from '@/components/ColorForm';
import prismadb from '@/lib/prismadb';

export default async function Page({ params }: { params: { colorId: string; storeId: string } }) {
	const color = await prismadb.color.findUnique({
		where: {
			id: params.colorId,
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<ColorForm initialData={color} />
			</div>
		</div>
	);
}
