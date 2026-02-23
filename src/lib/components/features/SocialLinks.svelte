<script lang="ts">
	const socials = {
		github: 'https://github.com',
		twitter: 'https://twitter.com',
		discord: 'https://discord.com',
		email: 'mailto:hello@example.com',
		spotify: 'https://spotify.com'
	};

	const icons: Record<string, string> = {
		github: '[code]',
		twitter: '[bird]',
		discord: '[chat]',
		email: '[mail]',
		spotify: '[music]'
	};

	const links = Object.entries(socials).filter(([, url]) => url);
</script>

<div id="links" class="retro-box rounded-lg p-4">
	<h3 class="font-display text-lg text-olive mb-3 flex items-center gap-2">
		<span>🔗</span> Find Me
	</h3>
	<div class="flex flex-wrap gap-2">
		{#each links as [name, url]}
			<a
				href={url}
				class="flex items-center gap-1 px-3 py-1 bg-sage/50 text-olive-dark text-sm rounded-full hover:bg-orange hover:text-white transition-colors capitalize"
			>
				<span>{icons[name] || '🔗'}</span>
				{name}
			</a>
		{/each}
	</div>
</div>
