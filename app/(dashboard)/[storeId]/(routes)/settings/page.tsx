import SettingForm from '@/components/SettingForm';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface Props {
	params: {
		storeId: string;
	};
}

export default async function Page({ params }: Props) {
	const { userId } = auth();

	if (!userId) return redirect('/');

	const store = await prismadb.store.findFirst({
		where: {
			id: params.storeId,
			userId,
		},
	});

	if (!store) return redirect('/');

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<SettingForm initialData={store} />
			</div>
		</div>
	);
}
