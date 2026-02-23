<script lang="ts">
	import { tracks } from '$lib/data/music';

	let isPlaying = $state(false);
	let currentTrack = $state(0);
	let progress = $state(0);

	const track = $derived(tracks[currentTrack]);

	function play() {
		isPlaying = true;
	}
	function pause() {
		isPlaying = false;
	}
	function toggle() {
		isPlaying = !isPlaying;
	}
	function next() {
		currentTrack = (currentTrack + 1) % tracks.length;
		progress = 0;
	}
	function prev() {
		currentTrack = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
		progress = 0;
	}
	function select(index: number) {
		currentTrack = index;
		progress = 0;
	}

	$effect(() => {
		if (!isPlaying) return;
		const interval = setInterval(() => {
			progress = Math.min(progress + 1, 100);
			if (progress >= 100) next();
		}, 300);
		return () => clearInterval(interval);
	});
</script>

<div class="music-player p-4 text-peach-light">
	<!-- Now Playing -->
	<div class="flex gap-4 mb-4">
		<div
			class="w-20 h-20 bg-gradient-to-br from-coral to-orange rounded-lg flex items-center justify-center text-4xl shadow-lg shrink-0"
		>
			{isPlaying ? '▶' : '♪'}
		</div>
		<div class="min-w-0 flex-1">
			<p class="font-semibold text-lg truncate">{track.title}</p>
			<p class="text-peach-dark text-sm truncate">{track.artist}</p>
			<p class="text-peach-dark/60 text-xs mt-1">{track.duration}</p>
		</div>
	</div>

	<!-- Progress -->
	<div class="h-2 bg-olive-dark rounded-full overflow-hidden mb-4">
		<div
			class="h-full bg-gradient-to-r from-orange to-coral transition-all"
			style="width: {progress}%"
		></div>
	</div>

	<!-- Controls -->
	<div class="flex items-center justify-center gap-4">
		<button onclick={prev} class="control-btn" aria-label="Previous">⏮</button>
		<button onclick={toggle} class="play-btn" aria-label={isPlaying ? 'Pause' : 'Play'}>
			{isPlaying ? '⏸' : '▶'}
		</button>
		<button onclick={next} class="control-btn" aria-label="Next">⏭</button>
	</div>

	<!-- Playlist -->
	<div class="mt-4 space-y-1">
		<p class="text-xs text-peach-dark mb-2">Playlist:</p>
		{#each tracks as t, i}
			<button
				onclick={() => select(i)}
				class="track-item"
				class:active={i === currentTrack}
			>
				<span class="mr-2">{i === currentTrack && isPlaying ? '▶' : '♪'}</span>
				<span class="truncate flex-1 text-left">{t.title}</span>
				<span class="text-xs opacity-60 ml-2">{t.duration}</span>
			</button>
		{/each}
	</div>
</div>

<style>
	.control-btn {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 9999px;
		background: var(--color-olive-dark);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: background 0.2s;
	}
	.control-btn:hover {
		background: var(--color-sage-dark);
	}
	.play-btn {
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 9999px;
		background: linear-gradient(to bottom right, var(--color-orange), var(--color-coral));
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		cursor: pointer;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
		transition: all 0.2s;
	}
	.play-btn:hover {
		background: linear-gradient(to bottom right, var(--color-coral), var(--color-orange));
	}
	.track-item {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0.5rem 0.75rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
		cursor: pointer;
		transition: background 0.2s;
		color: var(--color-peach-dark);
	}
	.track-item:hover {
		background: rgba(0, 0, 0, 0.2);
	}
	.track-item.active {
		background: rgba(var(--color-orange), 0.3);
		color: var(--color-peach-light);
	}
</style>
