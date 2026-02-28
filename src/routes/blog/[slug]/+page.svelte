<script lang="ts">
	import type { PageData } from './$types';
	import type { Component } from 'svelte';

	let { data }: { data: PageData } = $props();

	const modules = import.meta.glob<{ default: Component }>('/src/content/posts/*.md');
	
	let PostContent: Component | null = $state(null);
	
	$effect(() => {
		const loader = modules[`/src/content/posts/${data.slug}.md`];
		if (loader) {
			loader().then((mod) => {
				PostContent = mod.default;
			});
		}
	});

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'short', 
			day: 'numeric' 
		});
	}
</script>

<svelte:head>
	<title>{data.meta.title} - quiescent</title>
</svelte:head>

<div class="post-page">
	<div class="post-container">
		<article class="post-card">
			<header class="post-header">
				<h1>{data.meta.title}</h1>
				<div class="post-meta">
					<span class="date">{formatDate(data.meta.date)}</span>
					{#each data.meta.tags as tag}
						<span class="tag">{tag}</span>
					{/each}
				</div>
			</header>

			<div class="post-body">
				{#if PostContent}
					<PostContent />
				{:else}
					<p class="loading">loading...</p>
				{/if}
			</div>
		</article>

		{#if data.relatedPosts.length > 0}
			<section class="related-section">
				<h3>related posts</h3>
				{#each data.relatedPosts as post}
					<a href="/blog/{post.slug}" class="related-link">
						<span>{post.title}</span>
						<span class="related-date">{formatDate(post.date)}</span>
					</a>
				{/each}
			</section>
		{/if}
	</div>
</div>

<style>
	.post-page {
		padding: 1rem;
	}

	.post-container {
		max-width: 680px;
		margin: 0 auto;
	}

	.back-link {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--color-brown);
		text-decoration: none;
		margin-bottom: 1rem;
		padding: 0.3rem 0.5rem;
		background: var(--color-beige);
		border: 1px solid var(--color-tan);
		border-radius: 3px;
	}

	.back-link:hover {
		background: var(--color-cream);
		border-color: var(--color-amber);
		color: var(--color-amber);
	}

	.post-card {
		background: var(--color-cream);
		border: 2px solid var(--color-brown);
		border-radius: 6px;
		overflow: hidden;
	}

	.post-header {
		padding: 1rem 1.25rem;
		background: linear-gradient(180deg, var(--color-beige) 0%, var(--color-beige-dark) 100%);
		border-bottom: 2px solid var(--color-brown);
	}

	.post-header h1 {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-brown-dark);
		margin-bottom: 0.5rem;
		line-height: 1.3;
	}

	.post-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.4rem;
	}

	.date {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--color-brown);
		background: var(--color-cream);
		padding: 0.15rem 0.4rem;
		border: 1px solid var(--color-tan);
		border-radius: 2px;
	}

	.tag {
		font-family: var(--font-mono);
		font-size: 0.6rem;
		color: var(--color-brown-light);
		background: var(--color-tan);
		padding: 0.1rem 0.35rem;
		border-radius: 2px;
	}

	.post-body {
		padding: 1.25rem;
		font-size: 0.9rem;
		line-height: 1.75;
		color: var(--color-brown);
	}

	.loading {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-brown-light);
		text-align: center;
		padding: 2rem;
	}

	.post-body :global(h1) {
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--color-brown-dark);
		margin: 1.5rem 0 0.75rem;
		padding-bottom: 0.4rem;
		border-bottom: 2px solid var(--color-tan);
	}

	.post-body :global(h1:first-child) {
		margin-top: 0;
	}

	.post-body :global(h2) {
		font-size: 1.05rem;
		font-weight: 600;
		color: var(--color-brown-dark);
		margin: 1.25rem 0 0.5rem;
	}

	.post-body :global(h3) {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--color-brown);
		margin: 1rem 0 0.4rem;
	}

	.post-body :global(p) {
		margin: 0.75rem 0;
	}

	.post-body :global(ul),
	.post-body :global(ol) {
		padding-left: 1.25rem;
		margin: 0.75rem 0;
	}

	.post-body :global(li) {
		margin: 0.25rem 0;
	}

	.post-body :global(blockquote) {
		border-left: 3px solid var(--color-amber);
		padding-left: 0.75rem;
		margin: 1rem 0;
		color: var(--color-brown);
		font-style: italic;
	}

	.post-body :global(pre) {
		background: #2a2520;
		color: #e8d8c8;
		padding: 0.75rem 1rem;
		border-radius: 4px;
		overflow-x: auto;
		margin: 1rem 0;
		font-size: 0.8rem;
	}

	.post-body :global(code) {
		font-family: var(--font-mono);
		font-size: 0.85em;
		background: var(--color-beige);
		padding: 0.1em 0.3em;
		border-radius: 2px;
	}

	.post-body :global(pre code) {
		background: none;
		padding: 0;
	}

	.post-body :global(a) {
		color: var(--color-rust);
	}

	.post-body :global(a:hover) {
		color: var(--color-amber);
	}

	.post-body :global(hr) {
		border: none;
		border-top: 1px solid var(--color-tan);
		margin: 1.5rem 0;
	}

	.post-body :global(img) {
		max-width: 100%;
		border-radius: 4px;
		margin: 1rem 0;
	}

	.related-section {
		margin-top: 1.5rem;
		padding: 1rem;
		background: var(--color-beige);
		border: 2px solid var(--color-brown);
		border-radius: 6px;
	}

	.related-section h3 {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		font-weight: 600;
		color: var(--color-brown-light);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 0.75rem;
	}

	.related-link {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0.6rem;
		background: var(--color-cream);
		border: 1px solid var(--color-tan);
		border-radius: 4px;
		text-decoration: none;
		font-size: 0.8rem;
		color: var(--color-brown);
		margin-bottom: 0.5rem;
	}

	.related-link:last-child {
		margin-bottom: 0;
	}

	.related-link:hover {
		border-color: var(--color-amber);
		color: var(--color-amber);
	}

	.related-date {
		font-family: var(--font-mono);
		font-size: 0.6rem;
		color: var(--color-brown-light);
	}

	@media (max-width: 600px) {
		.post-page {
			padding: 0.75rem;
		}

		.post-header {
			padding: 0.75rem 1rem;
		}

		.post-header h1 {
			font-size: 1.1rem;
		}

		.post-body {
			padding: 1rem;
		}
	}
</style>
