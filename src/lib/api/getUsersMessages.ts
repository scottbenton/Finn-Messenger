import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import type { MessageDTO } from './readMessage';
import { firestore } from './firestore';
import { auth } from '$lib/auth.svelte';
import { convertToDTO } from './convertToDTO';

export async function getUsersMessages(): Promise<MessageDTO[]> {
	const uid = auth.currentUser?.uid;

	if (!uid) {
		return [];
	}
	const docs = await getDocs(
		query(
			collection(firestore, 'messages'),
			where('senderId', '==', uid),
			orderBy('sentOn', 'desc')
		)
	);

	const messages = docs.docs.map((doc) => convertToDTO(doc.id, doc.data()));

	return messages;
}
