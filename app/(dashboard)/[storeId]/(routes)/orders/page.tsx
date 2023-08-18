import OrderClient from '@/components/OrderClient';
import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';
import { format } from 'date-fns';
import { OrderColumn } from './columns';

export default async function Page({ params }: { params: { storeId: string } }) {
	const orders = await prismadb.order.findMany({
		where: {
			storeId: params.storeId,
		},
		include: {
			orderItems: {
				include: {
					product: true,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedOrder: OrderColumn[] = orders.map((order) => ({
		id: order.id,
		phone: order.phone,
		address: order.address,
		isPaid: order.isPaid,
		products: order.orderItems.map((orderItem) => orderItem.product.name).join(', '),
		totalPrice: formatter.format(
			order.orderItems.reduce((total, item) => {
				return total + Number(item.product.price);
			}, 0),
		),
		createdAt: format(order.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<OrderClient data={formattedOrder} />
			</div>
		</div>
	);
}
