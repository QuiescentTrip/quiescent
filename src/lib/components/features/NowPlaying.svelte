<script lang="ts">
	import { nowPlaying } from '$lib/data/music';
</script>

<div class="retro-box rounded-lg p-4">
	<h3 class="font-display text-lg text-olive mb-3 flex items-center gap-2">
		<span>🎧</span> Now Playing
	</h3>
	<div class="bg-olive-dark rounded-lg p-3 text-peach-light">
		<div class="flex items-center gap-3">
			<div
				class="w-12 h-12 bg-gradient-to-br from-coral to-orange rounded flex items-center justify-center text-2xl shrink-0"
			>
				♪
			</div>
			<div class="min-w-0">
				<p class="font-semibold truncate">{nowPlaying.title}</p>
				<p class="text-peach-dark text-xs truncate">{nowPlaying.artist}</p>
			</div>
		</div>
		<div class="mt-2 h-1 bg-olive rounded-full overflow-hidden">
			<div
				class="h-full bg-gradient-to-r from-orange to-coral"
				style="width: {nowPlaying.progress}%"
			></div>
		</div>
	</div>
</div>
