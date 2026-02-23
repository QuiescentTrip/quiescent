<script lang="ts">
	import { site } from '$lib/config';

	const icons: Record<string, string> = {
		github: '💻',
		twitter: '🐦',
		discord: '💬',
		email: '✉️',
		spotify: '🎵'
	};

	const links = Object.entries(site.socials).filter(([, url]) => url);
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
