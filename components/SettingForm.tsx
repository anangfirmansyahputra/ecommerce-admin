'use client';

import { Store } from '@prisma/client';
import Heading from './ui/heading';
import { Button } from './ui/button';
import { Trash } from 'lucide-react';
import { Separator } from './ui/separator';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import AlertModal from './modals/AlertModal';
import ApiAlert from './ui/ApiAlert';
import { useOrigin } from '@/hooks/useOrigin';

interface Props {
	initialData: Store;
}

const SettingForm: React.FC<Props> = ({ initialData }) => {
	const params = useParams();
	const router = useRouter();
	const origin = useOrigin();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const formSchema = z.object({
		name: z.string().min(1),
	});

	type SettingsFormValue = z.infer<typeof formSchema>;

	const form = useForm<SettingsFormValue>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	});

	const onSubmit = async (values: SettingsFormValue) => {
		try {
			setLoading(true);

			await axios.patch(`/api/stores/${params.storeId}`, values);
			router.refresh();
			toast.success('Store updated.');
		} catch (err) {
			toast.error('Something went wrong.');
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(`/api/stores/${params.storeId}`);
			router.refresh();
			router.push('/');
			toast.success('Store deleted.');
		} catch (err) {
			toast.error('Make sure you removed all products and categories first.');
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
					title='Settings'
					description='Manage store preferences'
				/>

				<Button
					disabled={loading}
					variant={'destructive'}
					size={'icon'}
					onClick={() => setOpen(true)}
				>
					<Trash className='w-4 h-4' />
				</Button>
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
											placeholder='Store name'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						disabled={loading}
						type='submit'
					>
						Saved changes
					</Button>
				</form>
			</Form>
			<Separator />
			<ApiAlert
				title='NEXT_PUBLIC_API_URL'
				description={`${origin}/api/${params.storeId}`}
				variant='public'
			/>
		</>
	);
};

export default SettingForm;
