import { auth } from '$lib/auth.svelte';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from './firestore';

export function updateMessage(
	messageId: string,
	content: string,
	receiverName: string
): Promise<void> {
	return new Promise((resolve, reject) => {
		const userId = auth.currentUser?.uid;

		if (!userId) {
			reject(new Error('User is not authenticated'));
			return;
		}

		updateDoc(doc(firestore, 'messages', messageId), {
			content,
			receiverName
		})
			.then(() => {
				resolve();
			})
			.catch((e) => {
				reject(e);
			});
	});
}
