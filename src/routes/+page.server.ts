import { getRecentPosts } from '$lib/posts.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const recentPosts = await getRecentPosts(3);
	return { recentPosts };
};
