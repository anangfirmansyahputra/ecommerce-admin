'use client';

import { useStoreModal } from '@/hooks/useStoreModal';
import Modal from '../ui/modal';

export const StoreModal = () => {
	const { isOpen, onClose, onOpen } = useStoreModal();

	return (
		<Modal
			title='Create Store'
			description='Add a new store to manage products and categories'
			isOpen={isOpen}
			onClose={onClose}
		>
			Future Create Store Form
		</Modal>
	);
};
