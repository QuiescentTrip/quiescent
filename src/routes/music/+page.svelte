<script lang="ts">
	import { onMount } from 'svelte';
	import { site } from '$lib/config';
	import { MusicPlayer } from '$lib/components/features';
	import { loadMusicFolders, type MusicFolder } from '$lib/data/music';

	let folders = $state<MusicFolder[]>([]);
	let loading = $state(true);

	onMount(async () => {
		folders = await loadMusicFolders();
		loading = false;
	});
</script>

<svelte:head>
	<title>music | {site.name}</title>
	<meta name="description" content="Music by {site.author}" />
</svelte:head>

<div class="music-page">
	<header class="page-header">
		<a href="/" class="back-link">← back</a>
		<h1>music</h1>
		<p class="tagline">tracks and sounds</p>
	</header>

	<main class="page-content">
		{#if loading}
			<div class="loading">Loading...</div>
		{:else if folders.length === 0}
			<div class="empty">
				<p>No music found.</p>
				<p class="hint">Add audio files to static/music/ or create subfolders.</p>
			</div>
		{:else}
			{#each folders as folder}
				<div class="folder-section">
					<MusicPlayer tracks={folder.tracks} title={folder.name} />
				</div>
			{/each}
		{/if}
	</main>
</div>

<style>
	.music-page {
		max-width: 600px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.page-header {
		margin-bottom: 1.5rem;
	}

	.back-link {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-tan-dark);
		text-decoration: none;
		display: inline-block;
		margin-bottom: 0.5rem;
	}

	.back-link:hover {
		color: var(--color-amber);
	}

	h1 {
		font-family: var(--font-display);
		font-size: 1.5rem;
		color: var(--color-brown-dark);
		margin: 0;
	}

	.tagline {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-tan-dark);
		margin-top: 0.25rem;
	}

	.page-content {
		background: var(--color-cream);
		border: 2px solid var(--color-tan-dark);
		padding: 1rem;
	}

	.loading {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-tan-dark);
		text-align: center;
		padding: 2rem;
	}

	.empty {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-brown);
		text-align: center;
		padding: 2rem;
	}

	.empty .hint {
		font-size: 0.7rem;
		color: var(--color-tan-dark);
		margin-top: 0.5rem;
	}

	.folder-section {
		margin-bottom: 1rem;
	}

	.folder-section:last-child {
		margin-bottom: 0;
	}
</style>
