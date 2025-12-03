import { doc, increment, updateDoc } from 'firebase/firestore';
import { firestore } from './firestore';

export async function updateReadCount(messageId: string): Promise<void> {
	await updateDoc(doc(firestore, 'messages', messageId), { readCount: increment(1) });
}
