import type { DocumentData, Timestamp } from 'firebase/firestore';
import type { MessageDTO } from './readMessage';

export function convertToDTO(id: string, message: DocumentData): MessageDTO {
	return {
		id,
		content: message.content,
		receiverName: message.receiverName,
		viewsByUserOtherThanSender: message.viewsByUserOtherThanSender,
		senderId: message.senderId,
		sentOn: (message.sentOn as Timestamp).toDate()
	};
}
