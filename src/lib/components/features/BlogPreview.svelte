<script lang="ts">
	import type { Post } from '$lib/types';
	import { Tag } from '$lib/components/ui';

	type Props = {
		posts: Post[];
		limit?: number;
	};

	let { posts, limit = 3 }: Props = $props();

	const displayPosts = $derived(posts.slice(0, limit));
</script>

<div class="space-y-4">
	{#each displayPosts as post}
		<a
			href="/blog/{post.slug}"
			class="block bg-white/60 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
		>
			<div class="flex items-start justify-between gap-4">
				<div class="flex-1 min-w-0">
					<h3 class="font-display text-lg text-olive group-hover:text-coral transition-colors truncate">
						{post.title}
					</h3>
					<p class="text-olive-dark text-sm mt-1 line-clamp-2">{post.excerpt}</p>
					<div class="flex flex-wrap items-center gap-2 mt-2">
						<span class="text-xs text-sage-dark font-mono">{post.date}</span>
						{#each post.tags as tag}
							<Tag {tag} />
						{/each}
					</div>
				</div>
				<span class="text-coral group-hover:translate-x-1 transition-transform shrink-0">→</span>
			</div>
		</a>
	{/each}
</div>
