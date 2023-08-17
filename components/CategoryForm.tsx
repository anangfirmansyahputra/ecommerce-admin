'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard, Category } from '@prisma/client';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Props {
	initialData: Category | null;
	billboards: Billboard[];
}

const CategoryForm: React.FC<Props> = ({ initialData, billboards }) => {
	const params = useParams();
	const router = useRouter();

	const title = initialData ? 'Edit Category' : 'Create Category';
	const description = initialData ? 'Edit a category' : 'Add a new category';
	const toastMessage = initialData ? 'Category updated.' : 'Category created.';
	const action = initialData ? 'Edit' : 'Create';

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const formSchema = z.object({
		name: z.string().min(1),
		billboardId: z.string().min(1),
	});

	type CategoryFormValue = z.infer<typeof formSchema>;

	const form = useForm<CategoryFormValue>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: '',
			billboardId: '',
		},
	});

	const onSubmit = async (values: CategoryFormValue) => {
		try {
			setLoading(true);

			if (initialData) {
				await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, values);
			} else {
				await axios.post(`/api/${params.storeId}/categories`, values);
			}
			router.refresh();
			router.push(`/${params.storeId}/categories`);
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
			await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`);
			router.refresh();
			router.push(`/${params.storeId}/categories`);
			toast.success('Billboard deleted.');
		} catch (err) {
			toast.error('Make sure you removed all products using this category first.');
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
											placeholder='Category Name'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='billboardId'
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Billboard</FormLabel>
										<Select
											disabled={loading}
											onValueChange={field.onChange}
											value={field.value !== '' ? field.value : undefined}
											defaultValue={field.value !== '' ? field.value : undefined}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														defaultValue={field.value}
														placeholder='Select a billboard'
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{billboards.map((billboard) => (
													<SelectItem
														key={billboard.id}
														value={billboard.id}
													>
														{billboard.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								);
							}}
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
							onClick={() => router.push(`/${params.storeId}/categories`)}
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

export default CategoryForm;
