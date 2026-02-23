<script lang="ts">
	import { site } from '$lib/config';
	import { MarkdownRenderer } from '$lib/components/features';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.meta.title} · {site.name}</title>
	<meta name="description" content={data.meta.excerpt} />
</svelte:head>

<div class="site-container font-body">
	<!-- Header -->
	<header class="site-header">
		<div class="flex items-center justify-between">
			<a href="/blog" class="text-coral hover:underline font-mono text-sm">← blog</a>
			<span class="text-sage-dark text-xs font-mono">{data.meta.date}</span>
		</div>
	</header>

	<!-- Sidebar -->
	<aside class="site-nav">
		<div class="nav-title">this post</div>
		<div class="text-xs text-olive-dark px-2 py-1 space-y-2">
			<div>
				<span class="text-sage-dark">date:</span><br/>
				{data.meta.date}
			</div>
			{#if data.meta.tags.length > 0}
				<div>
					<span class="text-sage-dark">tags:</span><br/>
					{#each data.meta.tags as tag}
						<span class="inline-block bg-sage-light px-1.5 py-0.5 rounded text-xs mt-1 mr-1">
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</div>

		<div class="nav-title mt-4">navigation</div>
		<a href="/">home</a>
		<a href="/blog">all posts</a>
		<a href="/#guestbook">guestbook</a>
	</aside>

	<!-- Main Content -->
	<main class="site-main">
		<article class="section full">
			<h1 class="text-xl font-display text-olive mb-4 pb-3 border-b border-sage">
				{data.meta.title}
			</h1>

			{#if data.isNotion && data.content}
				<div class="prose-content">
					<MarkdownRenderer content={data.content} />
				</div>
			{:else}
				<div class="prose-content">
					<p class="text-olive-dark">{data.meta.excerpt}</p>
					<p class="text-sage-dark italic mt-4 text-sm">
						set up notion to enable full content rendering.
					</p>
				</div>
			{/if}
		</article>

		<!-- Related Posts -->
		{#if data.relatedPosts.length > 0}
			<section class="section full">
				<h2>more posts</h2>
				<div class="space-y-2 mt-3">
					{#each data.relatedPosts as post}
						<a
							href="/blog/{post.slug}"
							class="block p-3 bg-peach border-2 border-sage hover:border-coral transition-colors"
						>
							<span class="text-olive hover:text-coral">{post.title}</span>
							<span class="text-sage-dark text-xs font-mono ml-2">{post.date}</span>
						</a>
					{/each}
				</div>
			</section>
		{/if}
	</main>

	<!-- Footer -->
	<footer class="site-footer">
		<a href="/blog">← back to blog</a>
		<span class="mx-2">·</span>
		<a href="/">home</a>
	</footer>
</div>

<style>
	.prose-content {
		font-size: 0.9rem;
		line-height: 1.7;
		color: var(--color-olive-dark);
	}

	.prose-content :global(h2) {
		font-size: 1.1rem;
		color: var(--color-coral);
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
		font-family: var(--font-mono);
	}

	.prose-content :global(h3) {
		font-size: 1rem;
		color: var(--color-olive);
		margin-top: 1.25rem;
		margin-bottom: 0.5rem;
	}

	.prose-content :global(p) {
		margin: 0.75rem 0;
	}

	.prose-content :global(ul),
	.prose-content :global(ol) {
		padding-left: 1.5rem;
		margin: 0.75rem 0;
	}

	.prose-content :global(li) {
		margin: 0.25rem 0;
	}

	.prose-content :global(blockquote) {
		border-left: 3px solid var(--color-sage);
		padding-left: 1rem;
		margin: 1rem 0;
		color: var(--color-sage-dark);
		font-style: italic;
	}

	.prose-content :global(pre) {
		background: var(--color-olive-dark);
		color: var(--color-peach-light);
		padding: 1rem;
		border-radius: 4px;
		overflow-x: auto;
		margin: 1rem 0;
		font-size: 0.85rem;
	}

	.prose-content :global(code) {
		font-family: var(--font-mono);
		font-size: 0.85em;
		background: var(--color-sage-light);
		padding: 0.15em 0.4em;
		border-radius: 3px;
	}

	.prose-content :global(pre code) {
		background: none;
		padding: 0;
		color: var(--color-peach-light);
	}

	.prose-content :global(a) {
		color: var(--color-coral);
	}

	.prose-content :global(a:hover) {
		text-decoration: underline;
	}

	.prose-content :global(hr) {
		border: none;
		border-top: 1px dashed var(--color-sage);
		margin: 2rem 0;
	}

	.prose-content :global(img) {
		max-width: 100%;
		border: 2px solid var(--color-sage);
		margin: 1rem 0;
	}
</style>
