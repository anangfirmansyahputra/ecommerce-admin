'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Size } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import AlertModal from './modals/AlertModal';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import Heading from './ui/heading';
import { Input } from './ui/input';
import { Separator } from './ui/separator';

interface Props {
	initialData: Size | null;
}

const SizeForm: React.FC<Props> = ({ initialData }) => {
	const params = useParams();
	const router = useRouter();

	const title = initialData ? 'Edit Size' : 'Create Size';
	const description = initialData ? 'Edit a size' : 'Add a new size';
	const toastMessage = initialData ? 'Size updated.' : 'Size created.';
	const action = initialData ? 'Edit' : 'Create';

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const formSchema = z.object({
		name: z.string().min(1),
		value: z.string().min(1),
	});

	type SizeFormValue = z.infer<typeof formSchema>;

	const form = useForm<SizeFormValue>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: '',
			value: '',
		},
	});

	const onSubmit = async (values: SizeFormValue) => {
		try {
			setLoading(true);

			if (initialData) {
				await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, values);
			} else {
				await axios.post(`/api/${params.storeId}/sizes`, values);
			}
			router.refresh();
			router.push(`/${params.storeId}/sizes`);
			toast.success(toastMessage);
		} catch (err) {
			toast.error('Something went wrong.');
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
			router.refresh();
			router.push(`/${params.storeId}/sizes`);
			toast.success('Size deleted.');
		} catch (err) {
			toast.error('Make sure you removed all categories using this billboard first.');
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>
			<div className='flex items-center justify-between'>
				<Heading
					title={title}
					description={description}
				/>
				{initialData && (
					<Button
						disabled={loading}
						variant={'destructive'}
						size={'icon'}
						onClick={() => setOpen(true)}
					>
						<Trash className='w-4 h-4' />
					</Button>
				)}
			</div>

			<Separator />

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 w-full'
				>
					<div className='grid grid-cols-3 gap-8'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder='Name'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='value'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Value</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder='Value'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='flex gap-2'>
						<Button
							disabled={loading}
							type='submit'
						>
							{action}
						</Button>
						<Button
							onClick={() => router.push(`/${params.storeId}/sizes`)}
							variant={'secondary'}
							disabled={loading}
							type='button'
						>
							Cancel
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};

export default SizeForm;
