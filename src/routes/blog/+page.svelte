<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const siteName = 'quiescent';

	let selectedTag = $state<string | null>(null);

	const filteredPosts = $derived(
		selectedTag ? data.posts.filter((p) => p.tags.includes(selectedTag as string)) : data.posts
	);
</script>

<svelte:head>
	<title>blog - {siteName}</title>
</svelte:head>

<div class="blog-page">
	<div class="blog-container">
		<section class="section full">
			<h2>blog</h2>
			<div class="section-content">
				<p>things i've written.</p>
				
				<!-- Filter Tags -->
				<div class="filter-bar">
					<span class="filter-label">filter:</span>
					<button
						onclick={() => (selectedTag = null)}
						class="filter-tag"
						class:active={selectedTag === null}
					>
						all
					</button>
					{#each data.tags as tag}
						<button
							onclick={() => (selectedTag = tag)}
							class="filter-tag"
							class:active={selectedTag === tag}
						>
							{tag}
						</button>
					{/each}
				</div>
			</div>
		</section>

		{#each filteredPosts as post}
			<a href="/blog/{post.slug}" class="section full post-card">
				<h2>{post.title}</h2>
				<div class="section-content">
					<div class="post-meta">
						<span class="display-panel">{post.date}</span>
						{#each post.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
					{#if post.excerpt}
						<p>{post.excerpt}</p>
					{/if}
				</div>
			</a>
		{/each}

		{#if filteredPosts.length === 0}
			<section class="section full">
				<h2>no results</h2>
				<div class="section-content">
					<p>nothing found.</p>
					<button onclick={() => (selectedTag = null)} class="btn mt-2">show all</button>
				</div>
			</section>
		{/if}
	</div>
</div>

<style>
	.blog-page {
		flex: 1;
		display: flex;
		justify-content: center;
		padding: 1rem;
		background: var(--color-beige);
	}

	.blog-container {
		width: 100%;
		max-width: 700px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.filter-bar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.75rem;
		padding-top: 0.75rem;
		border-top: 1px solid var(--color-tan);
	}

	.filter-label {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: var(--color-brown-light);
		text-transform: uppercase;
	}

	.filter-tag {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		padding: 0.25rem 0.5rem;
		background: var(--color-cream);
		border: 1px solid var(--color-tan);
		color: var(--color-brown);
		cursor: pointer;
		transition: all 0.1s ease;
	}

	.filter-tag:hover {
		background: var(--color-beige);
		border-color: var(--color-amber);
	}

	.filter-tag.active {
		background: var(--color-amber);
		border-color: var(--color-amber-dim);
		color: var(--color-brown-dark);
	}

	.post-card {
		text-decoration: none;
		transition: all 0.1s ease;
	}

	.post-card:hover {
		border-color: var(--color-amber);
	}

	.post-card:hover h2 {
		background: var(--color-amber);
	}

	.post-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.tag {
		font-size: 0.65rem;
		padding: 0.15rem 0.4rem;
		background: var(--color-cream);
		border: 1px solid var(--color-tan);
		color: var(--color-brown-light);
	}
</style>
