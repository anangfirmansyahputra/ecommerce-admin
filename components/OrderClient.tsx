'use client';

import { OrderColumn, columns } from '@/app/(dashboard)/[storeId]/(routes)/orders/columns';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { DataTable } from './ui/DataTable';
import ApiList from './ui/api-list';
import { Button } from './ui/button';
import Heading from './ui/heading';
import { Separator } from './ui/separator';

interface Props {
	data: OrderColumn[];
}

const OrderClient: React.FC<Props> = ({ data }) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Orders (${data.length})`}
					description='Manage orders for your store'
				/>
			</div>
			<Separator />
			<DataTable
				columns={columns}
				data={data}
				searchKey='products'
			/>
		</>
	);
};

export default OrderClient;
