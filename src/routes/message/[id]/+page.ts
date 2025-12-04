import { readMessage } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		const message = await readMessage(params.id);
		return { message };
	} catch (error) {
		console.error(error);
		return { message: null };
	}
};
