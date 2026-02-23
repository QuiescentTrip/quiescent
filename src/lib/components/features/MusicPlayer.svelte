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
	let vuLeft = $state(0);
	let vuRight = $state(0);
	let analyser: AnalyserNode | null = null;
	let audioContext: AudioContext | null = null;
	let sourceNode: MediaElementAudioSourceNode | null = null;
	let animationFrame: number;

	const track = $derived(tracks[currentTrack]);
	const hasAudio = $derived(track?.file != null);

	function formatTime(seconds: number): string {
		if (!seconds || !isFinite(seconds)) return '00:00';
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	}

	function setupAudioAnalyser() {
		if (!audioElement || audioContext) return;
		
		audioContext = new AudioContext();
		analyser = audioContext.createAnalyser();
		analyser.fftSize = 256;
		sourceNode = audioContext.createMediaElementSource(audioElement);
		sourceNode.connect(analyser);
		analyser.connect(audioContext.destination);
		
		updateVU();
	}

	function updateVU() {
		if (!analyser || !isPlaying) {
			vuLeft = Math.max(0, vuLeft - 3);
			vuRight = Math.max(0, vuRight - 3);
			if (vuLeft > 0 || vuRight > 0) {
				animationFrame = requestAnimationFrame(updateVU);
			}
			return;
		}

		const dataArray = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(dataArray);
		
		let sumLeft = 0;
		let sumRight = 0;
		const half = dataArray.length / 2;
		
		for (let i = 0; i < half; i++) {
			sumLeft += dataArray[i];
			sumRight += dataArray[i + Math.floor(half)];
		}
		
		vuLeft = Math.min(100, (sumLeft / half) * 0.7);
		vuRight = Math.min(100, (sumRight / half) * 0.7);
		
		animationFrame = requestAnimationFrame(updateVU);
	}

	function toggle() {
		if (!audioElement || !hasAudio) return;
		
		if (!audioContext) {
			setupAudioAnalyser();
		}
		
		if (isPlaying) {
			audioElement.pause();
			isPlaying = false;
		} else {
			if (audioContext?.state === 'suspended') {
				audioContext.resume();
			}
			audioElement.play();
			isPlaying = true;
			updateVU();
		}
	}

	function stop() {
		if (!audioElement) return;
		audioElement.pause();
		audioElement.currentTime = 0;
		isPlaying = false;
		progress = 0;
		currentTime = 0;
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
			if (!audioContext) {
				setupAudioAnalyser();
			}
			if (audioContext?.state === 'suspended') {
				audioContext.resume();
			}
			audioElement.play();
			isPlaying = true;
			shouldAutoplay = false;
			updateVU();
		}
	}

	function seek(e: MouseEvent) {
		if (!audioElement || !duration) return;
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const percent = (e.clientX - rect.left) / rect.width;
		audioElement.currentTime = percent * duration;
	}

	$effect(() => {
		return () => {
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
		};
	});

	$effect(() => {
		// When currentTrack changes, load the new audio source
		currentTrack;
		if (audioElement && track?.file) {
			audioElement.load();
		}
	});
</script>

{#if tracks.length === 0}
	<div class="player-unit">
		<div class="display-panel empty">
			<span class="font-mono text-sm tracking-widest text-display-text">NO TAPE INSERTED</span>
		</div>
	</div>
{:else}
	{#if track?.file}
		<audio
			bind:this={audioElement}
			src={track.file}
			preload="none"
			ontimeupdate={handleTimeUpdate}
			onended={handleEnded}
			onloadedmetadata={handleLoadedMetadata}
			oncanplay={handleCanPlay}
		></audio>
	{/if}

	<div class="player-unit">
		<!-- Cassette Tape Visual -->
		<div class="cassette">
			<div class="cassette-body">
				<!-- Top label area -->
				<div class="cassette-top-label">
					{#if title}
						<span class="tape-title">{title.toLowerCase()}</span>
					{/if}
				</div>
				
				<!-- Window showing reels -->
				<div class="cassette-window">
				<!-- Left reel -->
				<div class="reel left" class:spinning={isPlaying}>
					<div class="reel-center"></div>
					<div class="reel-spoke"></div>
					<div class="reel-spoke r2"></div>
					<div class="reel-spoke r3"></div>
				</div>
				
				<!-- Tape path -->
				<div class="tape-path">
					<div class="tape-line"></div>
					<div class="head-assembly">
						<div class="roller"></div>
						<div class="head"></div>
						<div class="roller"></div>
					</div>
					<div class="tape-line"></div>
				</div>
				
				<!-- Right reel -->
				<div class="reel right" class:spinning={isPlaying}>
					<div class="reel-center"></div>
					<div class="reel-spoke"></div>
					<div class="reel-spoke r2"></div>
					<div class="reel-spoke r3"></div>
				</div>
				</div>
				
				<!-- Bottom holes -->
				<div class="cassette-holes">
					<div class="hole"></div>
					<div class="hole wide"></div>
					<div class="hole"></div>
				</div>
			</div>
		</div>

		<!-- Display -->
		<div class="display-panel">
			<div class="display-row">
				<span class="track-number">{(currentTrack + 1).toString().padStart(2, '0')}</span>
				<span class="track-name">{track?.title ?? 'UNKNOWN'}</span>
			</div>
			<div class="display-row secondary">
				<span class="artist-name">{track?.artist ?? ''}</span>
				<span class="time">{formatTime(currentTime)} / {formatTime(duration)}</span>
			</div>
			<div class="display-status">
				{#if isPlaying}
					<span class="status-blink">&gt;</span> PLAYING
				{:else}
					<span>-</span> STOPPED
				{/if}
			</div>
		</div>

		<!-- VU Meters -->
		<div class="vu-meters">
			<div class="vu-row">
				<span class="vu-ch">L</span>
				<div class="vu-bar">
					<div class="vu-fill" style="width: {vuLeft}%"></div>
				</div>
			</div>
			<div class="vu-row">
				<span class="vu-ch">R</span>
				<div class="vu-bar">
					<div class="vu-fill" style="width: {vuRight}%"></div>
				</div>
			</div>
		</div>

		<!-- Progress Bar -->
		<button class="progress-bar" onclick={seek} aria-label="Seek">
			<div class="progress-track">
				<div class="progress-fill" style="width: {progress}%"></div>
				<div class="progress-thumb" style="left: {progress}%"></div>
			</div>
		</button>

		<!-- Transport Buttons -->
		<div class="transport">
			<button class="transport-btn" onclick={prev} title="Previous">
				<span class="icon">|&lt;&lt;</span>
				<span class="label">REW</span>
			</button>
			<button class="transport-btn" onclick={stop} title="Stop">
				<span class="icon">[]</span>
				<span class="label">STOP</span>
			</button>
			<button class="transport-btn play" onclick={toggle} disabled={!hasAudio} title={isPlaying ? 'Pause' : 'Play'}>
				<span class="icon">{isPlaying ? '||' : '>'}</span>
				<span class="label">{isPlaying ? 'PAUSE' : 'PLAY'}</span>
			</button>
			<button class="transport-btn" onclick={next} title="Next">
				<span class="icon">&gt;&gt;|</span>
				<span class="label">FF</span>
			</button>
		</div>

		<!-- Track List -->
		<div class="tracklist">
			<div class="tracklist-header">
				<span>TRACK LISTING</span>
				<span>{tracks.length} TRK</span>
			</div>
			<div class="tracklist-items">
				{#each tracks as t, i}
					<button
						onclick={() => select(i)}
						class="track-item"
						class:active={i === currentTrack}
						class:playing={i === currentTrack && isPlaying}
					>
						<span class="num">{(i + 1).toString().padStart(2, '0')}</span>
						<span class="name">{t.title}</span>
						{#if i === currentTrack && isPlaying}
							<span class="playing-indicator">
								<span class="bar"></span>
								<span class="bar"></span>
								<span class="bar"></span>
							</span>
						{/if}
						{#if !t.file}
							<span class="missing">[!]</span>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	/* === PLAYER UNIT === */
	.player-unit {
		background: linear-gradient(180deg, var(--color-beige) 0%, var(--color-beige-dark) 100%);
		border: 3px solid var(--color-tan-dark);
		border-radius: 6px;
		padding: 12px;
		box-shadow: 
			inset 0 1px 0 var(--color-cream),
			0 4px 12px rgba(0,0,0,0.15);
	}

	/* === CASSETTE TAPE === */
	.cassette {
		margin-bottom: 12px;
	}

	.cassette-body {
		background: linear-gradient(180deg, var(--color-tan) 0%, var(--color-tan-dark) 100%);
		border: 2px solid var(--color-brown);
		border-radius: 8px;
		padding: 8px;
		box-shadow: 
			inset 0 1px 0 var(--color-cream),
			0 2px 4px rgba(0,0,0,0.2);
	}

	.cassette-top-label {
		text-align: center;
		padding: 4px 8px;
		margin-bottom: 6px;
		background: var(--color-cream);
		border: 1px solid var(--color-tan-dark);
		border-radius: 3px;
	}

	.tape-title {
		font-family: var(--font-mono);
		font-size: 1rem;
		font-weight: normal;
		color: var(--color-brown-dark);
		letter-spacing: 0.1em;
	}

	.cassette-window {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		padding: 10px;
		background: var(--color-brown-dark);
		border: 2px solid var(--color-brown);
		border-radius: 4px;
		box-shadow: inset 0 2px 6px rgba(0,0,0,0.5);
	}

	/* Reels */
	.reel {
		width: 55px;
		height: 55px;
		background: var(--color-tan);
		border: 3px solid var(--color-brown-light);
		border-radius: 50%;
		position: relative;
		box-shadow: 
			inset 0 2px 4px rgba(255,255,255,0.2),
			0 2px 4px rgba(0,0,0,0.3);
	}

	.reel.spinning {
		animation: spin 1s linear infinite;
	}

	.reel-center {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 16px;
		height: 16px;
		background: var(--color-brown-dark);
		border: 2px solid var(--color-brown);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		z-index: 3;
	}

	.reel-spoke {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 2px;
		height: 20px;
		background: var(--color-beige);
		transform-origin: center top;
		transform: translate(-50%, 0);
		z-index: 2;
	}

	.reel-spoke.r2 {
		transform: translate(-50%, 0) rotate(120deg);
	}

	.reel-spoke.r3 {
		transform: translate(-50%, 0) rotate(240deg);
	}

	/* Tape path between reels */
	.tape-path {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.tape-line {
		width: 100%;
		height: 2px;
		background: var(--color-brown);
	}

	.head-assembly {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.roller {
		width: 6px;
		height: 12px;
		background: linear-gradient(90deg, var(--color-tan-dark), var(--color-tan), var(--color-tan-dark));
		border-radius: 2px;
	}

	.head {
		width: 20px;
		height: 8px;
		background: linear-gradient(180deg, var(--color-tan) 0%, var(--color-brown) 100%);
		border: 1px solid var(--color-brown);
		border-radius: 2px;
	}

	/* Bottom holes */
	.cassette-holes {
		display: flex;
		justify-content: center;
		gap: 20px;
		margin-top: 8px;
	}

	.hole {
		width: 8px;
		height: 8px;
		background: var(--color-brown-dark);
		border-radius: 50%;
		box-shadow: inset 0 1px 2px rgba(0,0,0,0.5);
	}

	.hole.wide {
		width: 30px;
		border-radius: 4px;
	}

	/* === DISPLAY PANEL === */
	.display-panel {
		background: var(--color-display);
		border: 2px solid var(--color-brown);
		border-radius: 4px;
		padding: 8px 10px;
		margin-bottom: 10px;
		box-shadow: inset 0 2px 6px rgba(0,0,0,0.4);
	}

	.display-panel.empty {
		text-align: center;
		padding: 16px;
	}

	.display-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 4px;
	}

	.display-row.secondary {
		margin-bottom: 2px;
	}

	.track-number {
		font-family: var(--font-mono);
		font-size: 1rem;
		font-weight: bold;
		color: var(--color-display-text);
		text-shadow: 0 0 8px var(--color-amber-glow);
		margin-right: 8px;
	}

	.track-name {
		flex: 1;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--color-display-text);
		text-shadow: 0 0 6px var(--color-amber-glow);
		text-transform: uppercase;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.artist-name {
		font-family: var(--font-mono);
		font-size: 0.5rem;
		color: var(--color-amber-dim);
		text-transform: uppercase;
	}

	.time {
		font-family: var(--font-mono);
		font-size: 0.6rem;
		color: var(--color-display-text);
		text-shadow: 0 0 6px var(--color-amber-glow);
	}

	.display-status {
		font-family: var(--font-mono);
		font-size: 0.5rem;
		color: var(--color-amber-dim);
		margin-top: 4px;
	}

	.status-blink {
		color: var(--color-display-text);
		animation: blink 1s ease-in-out infinite;
	}

	/* === VU METERS === */
	.vu-meters {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 6px;
		background: var(--color-beige-dark);
		border: 2px solid var(--color-tan);
		border-radius: 4px;
		margin-bottom: 10px;
	}

	.vu-row {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.vu-ch {
		font-family: var(--font-mono);
		font-size: 0.5rem;
		font-weight: bold;
		color: var(--color-brown);
		width: 10px;
	}

	.vu-bar {
		flex: 1;
		height: 8px;
		background: var(--color-display);
		border: 1px solid var(--color-brown);
		border-radius: 2px;
		overflow: hidden;
	}

	.vu-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--color-olive), var(--color-amber), var(--color-rust));
		transition: width 0.05s ease;
	}

	/* === PROGRESS BAR === */
	.progress-bar {
		width: 100%;
		padding: 6px;
		background: var(--color-beige-dark);
		border: 2px solid var(--color-tan);
		border-radius: 4px;
		margin-bottom: 10px;
		cursor: pointer;
	}

	.progress-track {
		height: 6px;
		background: var(--color-display);
		border: 1px solid var(--color-brown);
		border-radius: 3px;
		position: relative;
	}

	.progress-fill {
		height: 100%;
		background: var(--color-amber);
		border-radius: 2px;
		transition: width 0.1s ease;
	}

	.progress-thumb {
		position: absolute;
		top: 50%;
		width: 10px;
		height: 10px;
		background: var(--color-amber);
		border: 2px solid var(--color-cream);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0 1px 3px rgba(0,0,0,0.3);
		transition: left 0.1s ease;
	}

	/* === TRANSPORT BUTTONS === */
	.transport {
		display: flex;
		justify-content: center;
		gap: 6px;
		margin-bottom: 10px;
	}

	.transport-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		padding: 6px 10px;
		background: linear-gradient(180deg, var(--color-cream) 0%, var(--color-beige) 100%);
		border: none;
		border-radius: 4px;
		cursor: pointer;
		box-shadow: 0 2px 0 var(--color-tan-dark);
		transition: all 0.1s ease;
	}

	.transport-btn:hover {
		background: var(--color-beige-light);
	}

	.transport-btn:active {
		transform: translateY(1px);
		box-shadow: 0 1px 0 var(--color-tan-dark);
	}

	.transport-btn.play {
		padding: 6px 16px;
		background: linear-gradient(180deg, var(--color-amber) 0%, var(--color-amber-dim) 100%);
		box-shadow: 0 2px 0 var(--color-rust);
	}

	.transport-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.transport-btn .icon {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: bold;
		color: var(--color-brown);
	}

	.transport-btn.play .icon {
		color: var(--color-brown-dark);
	}

	.transport-btn .label {
		font-family: var(--font-mono);
		font-size: 0.4rem;
		font-weight: 600;
		color: var(--color-brown-light);
		text-transform: uppercase;
	}

	.transport-btn.play .label {
		color: var(--color-brown-dark);
	}

	/* === TRACK LIST === */
	.tracklist {
		background: var(--color-cream);
		border: 2px solid var(--color-tan);
		border-radius: 4px;
		overflow: hidden;
	}

	.tracklist-header {
		display: flex;
		justify-content: space-between;
		padding: 5px 8px;
		background: var(--color-beige);
		border-bottom: 1px solid var(--color-tan);
		font-family: var(--font-mono);
		font-size: 0.5rem;
		font-weight: 600;
		color: var(--color-brown);
		text-transform: uppercase;
	}

	.tracklist-items {
		max-height: 160px;
		overflow-y: auto;
	}

	.track-item {
		display: flex;
		align-items: center;
		gap: 6px;
		width: 100%;
		padding: 5px 8px;
		background: transparent;
		border: none;
		border-bottom: 1px solid var(--color-beige);
		cursor: pointer;
		text-align: left;
	}

	.track-item:last-child {
		border-bottom: none;
	}

	.track-item:hover {
		background: var(--color-beige-light);
	}

	.track-item.active {
		background: var(--color-beige);
	}

	.track-item.playing {
		background: linear-gradient(90deg, var(--color-beige), rgba(232,144,48,0.1));
	}

	.track-item .num {
		font-family: var(--font-mono);
		font-size: 0.5rem;
		color: var(--color-tan-dark);
		min-width: 14px;
	}

	.track-item.active .num {
		color: var(--color-amber);
	}

	.track-item .name {
		flex: 1;
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: var(--color-brown);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.playing-indicator {
		display: flex;
		align-items: flex-end;
		gap: 1px;
		height: 8px;
	}

	.playing-indicator .bar {
		width: 2px;
		background: var(--color-amber);
		animation: eq 0.4s ease-in-out infinite;
	}

	.playing-indicator .bar:nth-child(1) { height: 40%; }
	.playing-indicator .bar:nth-child(2) { height: 70%; animation-delay: 0.1s; }
	.playing-indicator .bar:nth-child(3) { height: 55%; animation-delay: 0.2s; }

	.track-item .missing {
		font-family: var(--font-mono);
		font-size: 0.5rem;
		color: var(--color-tan-dark);
	}

	/* === ANIMATIONS === */
	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.3; }
	}

	@keyframes eq {
		0%, 100% { transform: scaleY(0.5); }
		50% { transform: scaleY(1); }
	}
</style>
