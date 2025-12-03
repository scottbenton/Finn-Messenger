import { readMessage } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const message = await readMessage(params.id);
	return { message };
};
