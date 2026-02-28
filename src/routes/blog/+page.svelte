<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const siteName = 'quiescent';

	let selectedTag = $state<string | null>(null);

	const filteredPosts = $derived(
		selectedTag ? data.posts.filter((p) => p.tags.includes(selectedTag as string)) : data.posts
	);

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
	<title>blog - {siteName}</title>
</svelte:head>

<div class="blog-page">
	<div class="blog-container">
		<header class="blog-header">
			<div class="header-display">
				<span class="header-title">blog</span>
				<span class="header-subtitle">things i've written</span>
			</div>
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
		</header>

		{#each filteredPosts as post}
			<a href="/blog/{post.slug}" class="section full post-card">
				<h2>{post.title}</h2>
				<div class="section-content">
					<div class="post-meta">
						<span class="date-badge">{formatDate(post.date)}</span>
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
		min-height: 100%;
		padding: 1rem;
	}

	.blog-container {
		max-width: 700px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (max-width: 600px) {
		.blog-page {
			padding: 0.75rem;
		}

		.blog-container {
			gap: 0.75rem;
		}
	}

	.blog-header {
		background: linear-gradient(180deg, var(--color-tan) 0%, var(--color-tan-dark) 100%);
		border: 2px solid var(--color-brown);
		border-radius: 6px;
		padding: 0.75rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.header-display {
		background: var(--color-display);
		border: 2px solid var(--color-brown);
		border-radius: 3px;
		padding: 0.4rem 0.75rem;
		box-shadow: inset 0 2px 4px rgba(0,0,0,0.4);
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.header-title {
		font-family: var(--font-mono);
		font-size: 1rem;
		font-weight: bold;
		color: var(--color-display-text);
		text-transform: uppercase;
		letter-spacing: 0.15em;
		text-shadow: 0 0 8px var(--color-amber-glow);
	}

	.header-subtitle {
		font-family: var(--font-mono);
		font-size: 0.55rem;
		color: var(--color-amber-dim);
		letter-spacing: 0.05em;
	}

	.filter-bar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.4rem;
	}

	.filter-label {
		font-family: var(--font-mono);
		font-size: 0.6rem;
		color: var(--color-brown-dark);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.filter-tag {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		padding: 0.2rem 0.4rem;
		background: var(--color-beige);
		border: 1px solid var(--color-brown);
		border-radius: 2px;
		color: var(--color-brown);
		cursor: pointer;
		transition: all 0.1s ease;
		box-shadow: 0 1px 2px rgba(0,0,0,0.2);
	}

	.filter-tag:hover {
		background: var(--color-cream);
		border-color: var(--color-amber);
	}

	.filter-tag.active {
		background: var(--color-amber);
		border-color: var(--color-amber-dim);
		color: var(--color-brown-dark);
		box-shadow: inset 0 1px 2px rgba(0,0,0,0.2);
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
		gap: 0.4rem;
		margin-bottom: 0.5rem;
	}

	.date-badge {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: var(--color-display-text);
		background: var(--color-display);
		border: 1px solid var(--color-brown);
		border-radius: 2px;
		padding: 0.15rem 0.4rem;
		text-shadow: 0 0 4px var(--color-amber-glow);
	}

	.tag {
		font-family: var(--font-mono);
		font-size: 0.6rem;
		padding: 0.15rem 0.35rem;
		background: var(--color-beige);
		border: 1px solid var(--color-tan);
		border-radius: 2px;
		color: var(--color-brown-light);
	}
</style>
