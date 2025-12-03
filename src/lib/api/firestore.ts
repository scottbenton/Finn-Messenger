import { getFirestore } from 'firebase/firestore';
import { app } from '$lib/firebase';

export const firestore = getFirestore(app);
