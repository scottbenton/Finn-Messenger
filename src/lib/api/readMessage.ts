import { doc, getDoc } from 'firebase/firestore';
import { firestore } from './firestore';
import { convertToDTO } from './convertToDTO';

export interface MessageDTO {
	id: string;
	content: string;
	receiverName: string;
	viewsByUserOtherThanSender: number;
	senderId: string;
	sentOn: Date;
}

export async function readMessage(id: string): Promise<MessageDTO> {
	const messageDoc = await getDoc(doc(firestore, 'messages', id));
	const message = messageDoc.data();
	if (!message) throw new Error('Message not found');
	return convertToDTO(messageDoc.id, message);
}
