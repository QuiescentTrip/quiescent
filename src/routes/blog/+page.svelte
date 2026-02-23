<script lang="ts">
	import { PageHeader } from '$lib/components/layout';
	import { Tag, Card } from '$lib/components/ui';
	import { BlogCard } from '$lib/components/features';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedTag = $state<string | null>(null);

	const filteredPosts = $derived(
		selectedTag ? data.posts.filter((p) => p.tags.includes(selectedTag)) : data.posts
	);
</script>

<svelte:head>
	<title>Blog ✿ Fabian's Corner</title>
	<meta name="description" content="Thoughts, musings, and updates" />
</svelte:head>

<div class="min-h-screen bg-peach font-body">
	<PageHeader title="📝 Blog" subtitle="thoughts, musings, and updates" backLink="/" />

	<main class="max-w-4xl mx-auto px-4 py-8">
		<!-- Tag Filter -->
		<Card class="p-4 mb-6">
			<div class="flex flex-wrap items-center gap-2">
				<span class="text-olive-dark text-sm">Filter:</span>
				<button
					onclick={() => (selectedTag = null)}
					class="px-3 py-1 rounded-full text-sm transition-all {selectedTag === null
						? 'bg-olive text-peach'
						: 'bg-sage/30 text-olive-dark hover:bg-sage'}"
				>
					all
				</button>
				{#each data.tags as tag}
					<button
						onclick={() => (selectedTag = tag)}
						class="transition-all hover:scale-105"
					>
						<Tag {tag} size="md" />
					</button>
				{/each}
			</div>
		</Card>

		<!-- Posts -->
		<div class="space-y-4">
			{#each filteredPosts as post}
				<BlogCard {post} />
			{/each}
		</div>

		{#if filteredPosts.length === 0}
			<Card class="p-8 text-center">
				<p class="text-olive-dark text-lg">No posts found with that tag!</p>
				<button
					onclick={() => (selectedTag = null)}
					class="mt-4 px-4 py-2 bg-orange text-white rounded-full hover:bg-coral transition-colors"
				>
					Show all posts
				</button>
			</Card>
		{/if}
	</main>
</div>
