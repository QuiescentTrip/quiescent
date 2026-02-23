<script lang="ts">
	import { tracks } from '$lib/data/music';

	let isPlaying = $state(false);
	let currentTrack = $state(0);
	let progress = $state(0);

	const track = $derived(tracks[currentTrack]);

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
		isPlaying = true;
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

<div class="player">
	<!-- Now Playing -->
	<div class="now-playing">
		<div class="album-art">
			{isPlaying ? '▶' : '♪'}
		</div>
		<div class="track-info">
			<p class="title">{track.title}</p>
			<p class="artist">{track.artist}</p>
			<p class="duration">{track.duration}</p>
		</div>
	</div>

	<!-- Progress -->
	<div class="progress-bar">
		<div class="progress-fill" style="width: {progress}%"></div>
	</div>

	<!-- Controls -->
	<div class="controls">
		<button onclick={prev} class="control-btn" aria-label="Previous">⏮</button>
		<button onclick={toggle} class="play-btn" aria-label={isPlaying ? 'Pause' : 'Play'}>
			{isPlaying ? '⏸' : '▶'}
		</button>
		<button onclick={next} class="control-btn" aria-label="Next">⏭</button>
	</div>

	<!-- Playlist -->
	<div class="playlist">
		<p class="playlist-label">playlist</p>
		{#each tracks as t, i}
			<button
				onclick={() => select(i)}
				class="track-item"
				class:active={i === currentTrack}
			>
				<span class="track-icon">{i === currentTrack && isPlaying ? '▶' : '♪'}</span>
				<span class="track-title">{t.title}</span>
				<span class="track-duration">{t.duration}</span>
			</button>
		{/each}
	</div>
</div>

<style>
	.player {
		background: var(--color-olive-dark);
		border: 2px solid var(--color-sage);
		padding: 1rem;
		color: var(--color-peach-light);
	}

	.now-playing {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.album-art {
		width: 60px;
		height: 60px;
		background: linear-gradient(135deg, var(--color-coral) 0%, var(--color-orange) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		color: white;
		flex-shrink: 0;
	}

	.track-info {
		min-width: 0;
		flex: 1;
	}

	.title {
		font-size: 0.9rem;
		color: var(--color-peach-light);
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.artist {
		font-size: 0.8rem;
		color: var(--color-peach-dark);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.duration {
		font-size: 0.7rem;
		color: var(--color-sage);
		font-family: var(--font-mono);
		margin-top: 0.25rem;
	}

	.progress-bar {
		height: 4px;
		background: var(--color-olive);
		margin-bottom: 1rem;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--color-orange) 0%, var(--color-coral) 100%);
		transition: width 0.3s ease;
	}

	.controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.control-btn {
		width: 32px;
		height: 32px;
		border: 1px solid var(--color-sage);
		background: var(--color-olive);
		color: var(--color-peach-light);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.control-btn:hover {
		border-color: var(--color-orange);
		background: var(--color-olive-light);
	}

	.play-btn {
		width: 44px;
		height: 44px;
		background: linear-gradient(135deg, var(--color-orange) 0%, var(--color-coral) 100%);
		color: white;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.play-btn:hover {
		background: linear-gradient(135deg, var(--color-coral) 0%, var(--color-orange) 100%);
	}

	.playlist {
		border-top: 1px solid var(--color-olive);
		padding-top: 0.75rem;
	}

	.playlist-label {
		font-size: 0.7rem;
		color: var(--color-sage);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 0.5rem;
		font-family: var(--font-mono);
	}

	.track-item {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.5rem;
		font-size: 0.8rem;
		cursor: pointer;
		transition: all 0.15s ease;
		color: var(--color-peach-dark);
		background: transparent;
		border: none;
		border-left: 2px solid transparent;
		text-align: left;
	}

	.track-item:hover {
		background: rgba(0, 0, 0, 0.2);
		color: var(--color-peach-light);
		border-left-color: var(--color-orange);
	}

	.track-item.active {
		background: rgba(0, 0, 0, 0.2);
		color: var(--color-orange);
		border-left-color: var(--color-orange);
	}

	.track-icon {
		width: 16px;
		text-align: center;
		flex-shrink: 0;
	}

	.track-title {
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.track-duration {
		font-size: 0.7rem;
		color: var(--color-sage);
		font-family: var(--font-mono);
		flex-shrink: 0;
	}
</style>
