import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Use 308 permanent redirect to external blog
	throw redirect(308, 'https://signal-dispatch-blog.vercel.app');
};
