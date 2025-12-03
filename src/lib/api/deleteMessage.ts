import { deleteDoc, doc } from 'firebase/firestore';
import { firestore } from './firestore';

export async function deleteMessage(id: string): Promise<void> {
	await deleteDoc(doc(firestore, 'messages', id));
}
