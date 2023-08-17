'use client';

import { CategoryColumn, columns } from '@/app/(dashboard)/[storeId]/(routes)/categories/columns';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { DataTable } from './ui/DataTable';
import ApiList from './ui/api-list';
import { Button } from './ui/button';
import Heading from './ui/heading';
import { Separator } from './ui/separator';

interface Props {
	data: CategoryColumn[];
}

const CategoryClient: React.FC<Props> = ({ data }) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Categories (${data.length})`}
					description='Manage categories for your store'
				/>
				<Button
					size='sm'
					onClick={() => router.push(`/${params.storeId}/categories/new`)}
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
				description='API calls for Categories'
			/>
			<Separator />
			<ApiList
				entityName='categories'
				entityIdName='categoryId'
			/>
		</>
	);
};

export default CategoryClient;
