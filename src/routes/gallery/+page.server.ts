import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Use 308 permanent redirect to external gallery
	throw redirect(308, 'https://nino-chavez-gallery.vercel.app');
};
