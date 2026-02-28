<script lang="ts">
	import type { PageData } from './$types';
	import type { Component } from 'svelte';

	let { data }: { data: PageData } = $props();

	const siteName = 'quiescent';

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
</script>

<svelte:head>
	<title>{data.meta.title} - {siteName}</title>
</svelte:head>

<div class="post-page">
	<div class="post-container">
		<!-- Post Info Header -->
		<section class="section full">
			<h2>{data.meta.title}</h2>
			<div class="section-content">
				<div class="post-meta">
					<span class="display-panel">{data.meta.date}</span>
					{#if data.meta.tags.length > 0}
						{#each data.meta.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					{/if}
				</div>
			</div>
		</section>

		<!-- Post Content -->
		<article class="section full">
			<h2>content</h2>
			<div class="section-content prose">
				{#if PostContent}
					<PostContent />
				{:else}
					<p>loading...</p>
				{/if}
			</div>
		</article>

		{#if data.relatedPosts.length > 0}
			<section class="section full">
				<h2>related</h2>
				<div class="section-content">
					{#each data.relatedPosts as post}
						<div class="entry">
							<span class="date">{post.date}</span>
							<a href="/blog/{post.slug}">{post.title}</a>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<section class="section full">
			<h2>navigation</h2>
			<div class="section-content">
				<a href="/blog" class="btn">← all posts</a>
			</div>
		</section>
	</div>
</div>

<style>
	.post-page {
		min-height: 100%;
		padding: 1rem;
	}

	.post-container {
		max-width: 700px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (max-width: 600px) {
		.post-page {
			padding: 0.75rem;
		}

		.post-container {
			gap: 0.75rem;
		}
	}

	.post-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}

	.tag {
		display: inline-block;
		font-size: 0.65rem;
		padding: 0.1rem 0.35rem;
		background: var(--color-cream);
		border: 1px solid var(--color-tan);
		color: var(--color-brown-light);
	}

	.prose {
		font-size: 0.85rem;
		line-height: 1.7;
	}

	.prose :global(h2) {
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-brown-dark);
		margin-top: 1.25rem;
		margin-bottom: 0.5rem;
	}

	.prose :global(h3) {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--color-brown);
		margin-top: 1rem;
		margin-bottom: 0.4rem;
	}

	.prose :global(p) {
		margin: 0.5rem 0;
		color: var(--color-brown);
	}

	.prose :global(ul),
	.prose :global(ol) {
		padding-left: 1.25rem;
		margin: 0.5rem 0;
	}

	.prose :global(li) {
		margin: 0.2rem 0;
		color: var(--color-brown);
	}

	.prose :global(blockquote) {
		border-left: 2px solid var(--color-tan);
		padding-left: 0.75rem;
		margin: 0.75rem 0;
		color: var(--color-brown-light);
	}

	.prose :global(pre) {
		background: var(--color-beige);
		padding: 0.75rem;
		border: 1px solid var(--color-tan);
		overflow-x: auto;
		margin: 0.75rem 0;
		font-size: 0.8rem;
	}

	.prose :global(code) {
		font-family: var(--font-mono);
		font-size: 0.85em;
		background: var(--color-beige);
		padding: 0.1em 0.3em;
		border: 1px solid var(--color-tan);
	}

	.prose :global(pre code) {
		background: none;
		padding: 0;
		border: none;
	}

	.prose :global(a) {
		color: var(--color-rust);
	}

	.prose :global(a:hover) {
		color: var(--color-amber);
	}

	.prose :global(hr) {
		border: none;
		border-top: 1px solid var(--color-tan);
		margin: 1.5rem 0;
	}

	.prose :global(img) {
		max-width: 100%;
		border: 2px solid var(--color-tan);
		margin: 0.75rem 0;
	}
</style>
