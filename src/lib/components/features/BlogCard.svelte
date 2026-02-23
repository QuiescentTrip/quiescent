<script lang="ts">
	import type { Post } from '$lib/types';
	import { Tag, Card } from '$lib/components/ui';

	type Props = {
		post: Post;
		compact?: boolean;
	};

	let { post, compact = false }: Props = $props();
</script>

<a href="/blog/{post.slug}" class="block">
	<Card variant="interactive" class={compact ? 'p-4' : 'p-6'}>
		<div class="flex flex-col md:flex-row md:items-start gap-4">
			<div class="flex-1 min-w-0">
				<h3 class="font-display text-olive group-hover:text-coral transition-colors {compact ? 'text-base' : 'text-xl'}">
					{post.title}
				</h3>
				{#if !compact}
					<p class="text-olive-dark mt-2 leading-relaxed line-clamp-2">{post.excerpt}</p>
				{/if}
				<div class="flex flex-wrap items-center gap-2 mt-2">
					<span class="text-xs text-sage-dark font-mono">{post.date}</span>
					{#each post.tags as tag}
						<Tag {tag} />
					{/each}
				</div>
			</div>
			{#if !compact}
				<span class="text-coral text-2xl group-hover:translate-x-2 transition-transform hidden md:block">
					→
				</span>
			{/if}
		</div>
	</Card>
</a>
