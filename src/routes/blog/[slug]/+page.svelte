<script lang="ts">
	import { site } from '$lib/config';
	import { MarkdownRenderer } from '$lib/components/features';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.meta.title} - {site.name}</title>
</svelte:head>

<div class="site-container font-body">
	<!-- Header -->
	<header class="site-header">
		<a href="/blog" class="text-rust hover:text-amber text-sm">← blog</a>
		<div class="display-panel">{data.meta.date}</div>
	</header>

	<!-- Sidebar -->
	<aside class="site-nav">
		<div class="nav-title">this post</div>
		<div class="p-3 text-xs space-y-2">
			<div>
				<span class="text-brown-light">date</span><br/>
				{data.meta.date}
			</div>
			{#if data.meta.tags.length > 0}
				<div>
					<span class="text-brown-light">tags</span><br/>
					{#each data.meta.tags as tag}
						<span class="tag">{tag}</span>
					{/each}
				</div>
			{/if}
		</div>

		<div class="nav-title">navigate</div>
		<a href="/">home</a>
		<a href="/blog">all posts</a>
	</aside>

	<!-- Main -->
	<main class="site-main">
		<article class="section full">
			<h2>{data.meta.title}</h2>
			<div class="section-content prose">
				{#if data.isNotion && data.content}
					<MarkdownRenderer content={data.content} />
				{:else}
					<p>{data.meta.excerpt}</p>
					<p class="text-sm text-brown-light mt-3">full content requires notion.</p>
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
	</main>

	<!-- Footer -->
	<footer class="site-footer">
		<a href="/blog">← blog</a>
		<span>·</span>
		<a href="/">home</a>
	</footer>
</div>

<style>
	.tag {
		display: inline-block;
		font-size: 0.65rem;
		padding: 0.1rem 0.35rem;
		background: var(--color-cream);
		border: 1px solid var(--color-tan);
		color: var(--color-brown-light);
		margin-right: 0.25rem;
		margin-top: 0.25rem;
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
