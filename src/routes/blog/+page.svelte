<script lang="ts">
	import { site } from '$lib/config';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedTag = $state<string | null>(null);

	const filteredPosts = $derived(
		selectedTag ? data.posts.filter((p) => p.tags.includes(selectedTag as string)) : data.posts
	);
</script>

<svelte:head>
	<title>blog · {site.name}</title>
	<meta name="description" content="thoughts, musings, and updates" />
</svelte:head>

<div class="site-container font-body">
	<!-- Header -->
	<header class="site-header">
		<div class="flex items-center justify-between">
			<a href="/" class="text-coral hover:underline font-mono text-sm">← {site.name}</a>
			<span class="text-sage-dark text-xs font-mono">{data.posts.length} posts</span>
		</div>
	</header>

	<!-- Sidebar -->
	<nav class="site-nav">
		<div class="nav-title">filter by tag</div>
		<button
			onclick={() => (selectedTag = null)}
			class="block w-full text-left px-2 py-1 text-sm transition-all border-l-2
				{selectedTag === null 
					? 'text-coral border-coral bg-peach' 
					: 'text-olive-dark border-transparent hover:text-coral hover:bg-peach'}"
		>
			all posts
		</button>
		{#each data.tags as tag}
			<button
				onclick={() => (selectedTag = tag)}
				class="block w-full text-left px-2 py-1 text-sm transition-all border-l-2
					{selectedTag === tag 
						? 'text-coral border-coral bg-peach' 
						: 'text-olive-dark border-transparent hover:text-coral hover:bg-peach'}"
			>
				{tag}
			</button>
		{/each}
	</nav>

	<!-- Main Content -->
	<main class="site-main">
		<section class="section full">
			<h2>blog</h2>
			<p class="mb-4">thoughts, notes, and whatever else.</p>
		</section>

		{#each filteredPosts as post}
			<a 
				href="/blog/{post.slug}" 
				class="section full hover:border-coral transition-colors group"
			>
				<div class="flex flex-col sm:flex-row sm:items-baseline gap-2">
					<span class="text-sage-dark font-mono text-xs shrink-0">
						{post.date}
					</span>
					<h3 class="text-olive group-hover:text-coral transition-colors font-normal">
						{post.title}
					</h3>
				</div>
				{#if post.excerpt}
					<p class="mt-2 text-sm text-olive-dark line-clamp-2">{post.excerpt}</p>
				{/if}
				{#if post.tags.length > 0}
					<div class="flex gap-2 mt-2">
						{#each post.tags as tag}
							<span class="text-xs text-sage-dark bg-sage-light px-2 py-0.5 rounded">
								{tag}
							</span>
						{/each}
					</div>
				{/if}
			</a>
		{/each}

		{#if filteredPosts.length === 0}
			<section class="section full text-center">
				<p class="text-olive-dark">no posts found with that tag.</p>
				<button
					onclick={() => (selectedTag = null)}
					class="mt-3 text-coral hover:underline text-sm"
				>
					show all posts
				</button>
			</section>
		{/if}
	</main>

	<!-- Footer -->
	<footer class="site-footer">
		<a href="/">← back to home</a>
	</footer>
</div>
