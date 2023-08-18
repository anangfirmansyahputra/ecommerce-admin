'use client';

import { ProductColumn, columns } from '@/app/(dashboard)/[storeId]/(routes)/products/columns';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { DataTable } from './ui/DataTable';
import ApiList from './ui/api-list';
import { Button } from './ui/button';
import Heading from './ui/heading';
import { Separator } from './ui/separator';

interface Props {
	data: ProductColumn[];
}

const ProductClient: React.FC<Props> = ({ data }) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Products (${data.length})`}
					description='Manage products for your store'
				/>
				<Button
					size='sm'
					onClick={() => router.push(`/${params.storeId}/products/new`)}
				>
					<Plus className='mr-2 w-4 h-4' />
					Add New
				</Button>
			</div>
			<Separator />
			<DataTable
				columns={columns}
				data={data}
				searchKey='name'
			/>
			<Heading
				title='API'
				description='API calls for Products'
			/>
			<Separator />
			<ApiList
				entityName='products'
				entityIdName='productId'
			/>
		</>
	);
};

export default ProductClient;
