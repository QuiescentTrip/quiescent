import type { Post, PostModule } from './types';

export async function getPosts(): Promise<Post[]> {
	const modules = import.meta.glob<PostModule>('/src/content/posts/*.md', { eager: true });
	const posts: Post[] = [];

	for (const path in modules) {
		const module = modules[path];
		const slug = path.split('/').pop()?.replace('.md', '') ?? '';

		if (slug.startsWith('_')) continue;
		if (module.metadata.published) {
			posts.push({ ...module.metadata, slug });
		}
	}

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(slug: string): Promise<{ meta: Post } | null> {
	try {
		const module = (await import(`../content/posts/${slug}.md`)) as PostModule;

		if (!module.metadata.published) return null;

		return {
			meta: { ...module.metadata, slug }
		};
	} catch {
		return null;
	}
}

export async function getRecentPosts(count: number = 3): Promise<Post[]> {
	const posts = await getPosts();
	return posts.slice(0, count);
}

export async function getAllTags(): Promise<string[]> {
	const posts = await getPosts();
	const tags = new Set<string>();
	posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
	return [...tags].sort();
}
