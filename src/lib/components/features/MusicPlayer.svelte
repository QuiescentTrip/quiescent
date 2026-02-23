<script lang="ts">
	import type { Track } from '$lib/data/music';

	type Props = {
		tracks: Track[];
		title?: string;
	};

	let { tracks, title }: Props = $props();

	let isPlaying = $state(false);
	let currentTrack = $state(0);
	let progress = $state(0);
	let currentTime = $state(0);
	let duration = $state(0);
	let audioElement: HTMLAudioElement | null = $state(null);
	let shouldAutoplay = $state(false);

	const track = $derived(tracks[currentTrack]);
	const hasAudio = $derived(track?.file != null);

	function formatTime(seconds: number): string {
		if (!seconds || !isFinite(seconds)) return '0:00';
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	function toggle() {
		if (!audioElement || !hasAudio) return;
		if (isPlaying) {
			audioElement.pause();
			isPlaying = false;
		} else {
			audioElement.play();
			isPlaying = true;
		}
	}

	function next() {
		if (tracks.length === 0) return;
		shouldAutoplay = isPlaying;
		currentTrack = (currentTrack + 1) % tracks.length;
		progress = 0;
		currentTime = 0;
	}

	function prev() {
		if (tracks.length === 0) return;
		shouldAutoplay = isPlaying;
		currentTrack = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
		progress = 0;
		currentTime = 0;
	}

	function select(index: number) {
		if (index === currentTrack && audioElement) {
			toggle();
			return;
		}
		shouldAutoplay = true;
		currentTrack = index;
		progress = 0;
		currentTime = 0;
	}

	function handleTimeUpdate() {
		if (!audioElement) return;
		currentTime = audioElement.currentTime;
		duration = audioElement.duration || 0;
		progress = duration > 0 ? (currentTime / duration) * 100 : 0;
	}

	function handleEnded() {
		shouldAutoplay = true;
		next();
	}

	function handleLoadedMetadata() {
		if (audioElement) {
			duration = audioElement.duration;
		}
	}

	function handleCanPlay() {
		if (shouldAutoplay && audioElement) {
			audioElement.play();
			isPlaying = true;
			shouldAutoplay = false;
		}
	}
</script>

{#if tracks.length === 0}
	<div class="player">
		<div class="display">
			<div class="display-row">
				<span class="track-title">No tracks</span>
			</div>
		</div>
	</div>
{:else}
	<!-- Hidden audio element -->
	{#if track?.file}
		<audio
			bind:this={audioElement}
			src={track.file}
			ontimeupdate={handleTimeUpdate}
			onended={handleEnded}
			onloadedmetadata={handleLoadedMetadata}
			oncanplay={handleCanPlay}
		></audio>
	{/if}

	<div class="player">
		{#if title}
			<div class="player-title">{title}</div>
		{/if}

		<!-- Display -->
		<div class="display">
			<div class="display-row">
				<span class="track-num">{(currentTrack + 1).toString().padStart(2, '0')}</span>
				<span class="track-title">{track?.title ?? 'Unknown'}</span>
			</div>
			<div class="display-row secondary">
				<span>{track?.artist ?? 'Unknown'}</span>
				<span>{formatTime(currentTime)} / {formatTime(duration)}</span>
			</div>
		</div>

		<!-- Progress -->
		<div class="progress">
			<div class="progress-fill" style="width: {progress}%"></div>
		</div>

		<!-- Controls -->
		<div class="controls">
			<button onclick={prev} class="ctrl-btn">◄◄</button>
			<button onclick={toggle} class="ctrl-btn play" disabled={!hasAudio}>{isPlaying ? '■' : '►'}</button>
			<button onclick={next} class="ctrl-btn">►►</button>
		</div>

		<!-- Track List -->
		<div class="tracklist">
			{#each tracks as t, i}
				<button
					onclick={() => select(i)}
					class="track"
					class:active={i === currentTrack}
				>
					<span class="num">{(i + 1).toString().padStart(2, '0')}</span>
					<span class="name">{t.title}</span>
					{#if !t.file}
						<span class="no-file">⚠</span>
					{/if}
				</button>
			{/each}
		</div>
	</div>
{/if}

<style>
	.player {
		background: var(--color-beige);
		border: 2px solid var(--color-tan-dark);
		padding: 0.75rem;
	}

	.player-title {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-brown);
		margin-bottom: 0.5rem;
		padding-bottom: 0.35rem;
		border-bottom: 1px solid var(--color-tan);
	}

	.display {
		background: var(--color-display);
		border: 2px solid var(--color-brown);
		padding: 0.5rem 0.75rem;
		margin-bottom: 0.5rem;
	}

	.display-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: var(--font-mono);
		color: var(--color-display-text);
		font-size: 0.8rem;
	}

	.display-row.secondary {
		font-size: 0.65rem;
		color: var(--color-tan);
		margin-top: 0.25rem;
	}

	.track-num {
		opacity: 0.6;
	}

	.track-title {
		font-weight: 500;
	}

	.progress {
		height: 4px;
		background: var(--color-tan);
		margin-bottom: 0.5rem;
	}

	.progress-fill {
		height: 100%;
		background: var(--color-amber);
		transition: width 0.3s ease;
	}

	.controls {
		display: flex;
		justify-content: center;
		gap: 0.35rem;
		margin-bottom: 0.5rem;
	}

	.ctrl-btn {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		padding: 0.4rem 0.75rem;
		background: var(--color-cream);
		border: 2px solid var(--color-tan-dark);
		color: var(--color-brown-dark);
		cursor: pointer;
		box-shadow: 
			inset 1px 1px 0 var(--color-beige-light),
			inset -1px -1px 0 var(--color-beige-dark);
	}

	.ctrl-btn:hover {
		background: var(--color-amber);
		border-color: var(--color-amber-dim);
	}

	.ctrl-btn:active {
		box-shadow: inset 1px 1px 2px rgba(0,0,0,0.15);
	}

	.ctrl-btn.play {
		padding: 0.4rem 1rem;
	}

	.tracklist {
		background: var(--color-cream);
		border: 1px solid var(--color-tan);
	}

	.track {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.35rem 0.5rem;
		font-size: 0.75rem;
		font-family: var(--font-mono);
		cursor: pointer;
		color: var(--color-brown);
		background: transparent;
		border: none;
		border-bottom: 1px solid var(--color-beige);
		text-align: left;
	}

	.track:last-child {
		border-bottom: none;
	}

	.track:hover {
		background: var(--color-beige-light);
	}

	.track.active {
		background: var(--color-beige);
		color: var(--color-amber-dim);
	}

	.num {
		color: var(--color-tan-dark);
		font-size: 0.65rem;
	}

	.track.active .num {
		color: var(--color-amber);
	}

	.name {
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.no-file {
		color: var(--color-tan-dark);
		font-size: 0.65rem;
		opacity: 0.5;
	}

	.ctrl-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.ctrl-btn:disabled:hover {
		background: var(--color-cream);
		border-color: var(--color-tan-dark);
	}
</style>
