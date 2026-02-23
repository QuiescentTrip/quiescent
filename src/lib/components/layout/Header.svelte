<script lang="ts">
	type Props = {
		showNav?: boolean;
		minimal?: boolean;
	};

	let { showNav = true, minimal = false }: Props = $props();

	const siteName = 'quiescent';
	const siteTagline = 'adjective -- quiet, still, or inactive';

	const navLinks = [
		{ name: 'home', href: '/' },
		{ name: 'blog', href: '/blog' },
		{ name: 'music', href: '/#music' },
		{ name: 'about', href: '/#about' }
	];
</script>

{#if minimal}
	<!-- Minimal header for sub-pages -->
	<header class="site-header">
		<a href="/" class="text-accent hover:underline font-mono text-sm">← back to {siteName}</a>
	</header>
{:else}
	<!-- Full header for home -->
	<header class="site-header">
		<div class="accent-bar mb-3"></div>
		<h1>{siteName}</h1>
		<p class="tagline">{siteTagline}</p>
	</header>
{/if}
