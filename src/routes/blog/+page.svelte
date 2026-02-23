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

<div class="site-container font-body">
	<!-- Header -->
	<header class="site-header">
		<div>
			<a href="/" class="text-rust hover:text-amber text-sm">← back</a>
		</div>
		<div class="display-panel">{data.posts.length} posts</div>
	</header>

	<!-- Sidebar -->
	<nav class="site-nav">
		<div class="nav-title">filter</div>
		<button
			onclick={() => (selectedTag = null)}
			class="nav-btn"
			class:active={selectedTag === null}
		>
			all
		</button>
		{#each data.tags as tag}
			<button
				onclick={() => (selectedTag = tag)}
				class="nav-btn"
				class:active={selectedTag === tag}
			>
				{tag}
			</button>
		{/each}

		<div class="nav-title">navigate</div>
		<a href="/">
			home
			<span class="nav-stripe-1"></span>
			<span class="nav-stripe-2"></span>
			<span class="nav-stripe-3"></span>
		</a>
	</nav>

	<!-- Main -->
	<main class="site-main">
		<section class="section full">
			<h2>blog</h2>
			<div class="section-content">
				<p>things i've written.</p>
			</div>
		</section>

		{#each filteredPosts as post}
			<a href="/blog/{post.slug}" class="section full post-card">
				<h2>{post.title}</h2>
				<div class="section-content">
					<div class="flex items-center gap-2 mb-2">
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
	</main>

	<!-- Footer -->
	<footer class="site-footer">
		<a href="/">← home</a>
	</footer>
</div>

<style>
	.nav-btn {
		display: block;
		width: 100%;
		padding: 0.4rem 0.75rem;
		font-size: 0.8rem;
		color: var(--color-brown);
		text-decoration: none;
		border: none;
		background: transparent;
		border-left: 2px solid transparent;
		cursor: pointer;
		text-align: left;
		transition: all 0.1s ease;
	}

	.nav-btn:hover {
		background: var(--color-cream);
		border-left-color: var(--color-amber);
	}

	.nav-btn.active {
		background: var(--color-cream);
		border-left-color: var(--color-amber);
		color: var(--color-amber-dim);
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

	.tag {
		font-size: 0.65rem;
		padding: 0.15rem 0.4rem;
		background: var(--color-cream);
		border: 1px solid var(--color-tan);
		color: var(--color-brown-light);
	}
</style>
