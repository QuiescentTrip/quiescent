import { getPosts, getAllTags } from '$lib/posts.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = await getPosts();
	const tags = await getAllTags();

	return { posts, tags };
};
