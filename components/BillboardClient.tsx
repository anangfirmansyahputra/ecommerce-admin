'use client';

import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import Heading from './ui/heading';
import { Separator } from './ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { Billboard } from '@prisma/client';
import { BillboardColumn, columns } from '@/app/(dashboard)/[storeId]/(routes)/billboards/columns';
import { DataTable } from './ui/DataTable';
import ApiList from './ui/api-list';

interface Props {
	data: BillboardColumn[];
}

const BillboardClient: React.FC<Props> = ({ data }) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Billboards (${data.length})`}
					description='Manage billboards for your store'
				/>
				<Button
					size='sm'
					onClick={() => router.push(`/${params.storeId}/billboards/new`)}
				>
					<Plus className='mr-2 w-4 h-4' />
					Add New
				</Button>
			</div>
			<Separator />
			<DataTable
				columns={columns}
				data={data}
				searchKey='label'
			/>
			<Heading
				title='API'
				description='API calls for Billboards'
			/>
			<Separator />
			<ApiList
				entityName='billboards'
				entityIdName='billboardId'
			/>
		</>
	);
};

export default BillboardClient;
