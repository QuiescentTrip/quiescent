<script lang="ts">
	import { site } from '$lib/config';

	type Props = {
		showNav?: boolean;
	};

	let { showNav = true }: Props = $props();

	const navLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'Blog', href: '/blog' },
		{ name: 'Music', href: '/#music' },
		{ name: 'About', href: '/#about' },
		{ name: 'Guestbook', href: '/#guestbook' },
		{ name: 'Links', href: '/#links' }
	];
</script>

<header class="retro-box rounded-lg p-6 mb-6 text-center">
	<h1 class="font-display text-4xl md:text-5xl text-olive mb-2">
		{site.name}
	</h1>
	<p class="text-olive-dark">{site.tagline}</p>

	{#if showNav}
		<nav class="flex flex-wrap justify-center gap-2 mt-4">
			{#each navLinks as link}
				<a
					href={link.href}
					class="px-4 py-2 bg-sage text-olive-dark rounded-full text-sm font-semibold hover:bg-orange hover:text-white transition-colors"
				>
					{link.name}
				</a>
			{/each}
		</nav>
	{/if}
</header>
