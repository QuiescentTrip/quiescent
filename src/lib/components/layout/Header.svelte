<script lang="ts">
	import { site } from '$lib/config';

	type Props = {
		showNav?: boolean;
		minimal?: boolean;
	};

	let { showNav = true, minimal = false }: Props = $props();

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
		<a href="/" class="text-accent hover:underline font-mono text-sm">← back to {site.name}</a>
	</header>
{:else}
	<!-- Full header for home -->
	<header class="site-header">
		<div class="accent-bar mb-3"></div>
		<h1>{site.name}</h1>
		<p class="tagline">{site.tagline}</p>
	</header>
{/if}
