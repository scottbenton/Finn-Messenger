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

		console.debug(content);
		let fixedContent = content;
		if (fixedContent.endsWith('<p></p>')) {
			fixedContent = fixedContent.slice(0, -7);
		}

		console.debug(fixedContent);

		updateDoc(doc(firestore, 'messages', messageId), {
			content: fixedContent,
			receiverName
		})
			.then(() => {
				console.debug('UPDATED');
				resolve();
			})
			.catch((e) => {
				console.error(e);
				reject(e);
			});
	});
}
