import { auth } from '$lib/auth.svelte';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from './firestore';
import type { MessageDTO } from './readMessage';

export function createMessage(content: string, receiverName: string): Promise<MessageDTO> {
	return new Promise((resolve, reject) => {
		const userId = auth.currentUser?.uid;

		if (!userId) {
			reject(new Error('User is not authenticated'));
			return;
		}

		addDoc(collection(firestore, 'messages'), {
			content,
			receiverName,
			viewsByUserOtherThanSender: 0,
			senderId: userId,
			sentOn: serverTimestamp()
		})
			.then((doc) => {
				resolve({
					id: doc.id,
					content,
					receiverName,
					viewsByUserOtherThanSender: 0,
					senderId: userId,
					sentOn: new Date()
				});
			})
			.catch((e) => {
				reject(e);
			});
	});
}
