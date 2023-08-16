'use client';

import Modal from '@/components/ui/modal';
import { useStoreModal } from '@/hooks/useStoreModal';
import { useEffect } from 'react';

export default function Home() {
	const { isOpen, onOpen } = useStoreModal();

	useEffect(() => {
		if (!isOpen) {
			onOpen();
		}
	}, [isOpen, onOpen]);

	return <div className='p-4'>root page</div>;
}
