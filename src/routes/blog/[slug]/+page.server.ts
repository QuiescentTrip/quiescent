import { getPost, getRecentPosts } from '$lib/posts.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const post = await getPost(params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	const recentPosts = await getRecentPosts(3);
	const relatedPosts = recentPosts.filter((p) => p.slug !== params.slug).slice(0, 2);

	return {
		meta: post.meta,
		slug: params.slug,
		relatedPosts
	};
};
