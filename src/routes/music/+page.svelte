<script lang="ts">
	import { onMount } from 'svelte';
	import { site } from '$lib/config';
	import { MusicPlayer } from '$lib/components/features';
	import { RotaryKnob } from '$lib/components/ui';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let outputVolume = $state(70);

	function updateMusicPlayersVolume(volume: number) {
		const players = document.querySelectorAll('audio');
		players.forEach((el: HTMLAudioElement) => {
			el.volume = volume / 100;
		});
	}

	onMount(() => {
		updateMusicPlayersVolume(outputVolume);
	});
</script>

<svelte:head>
	<title>music | {site.name}</title>
	<meta name="description" content="Music by {site.author}" />
</svelte:head>

<div class="min-h-screen p-4 sm:p-8 relative overflow-hidden">
	<!-- Cassette Deck Unit -->
	<div class="max-w-[680px] mx-auto">
		<!-- Main Chassis -->
		<div class="bg-gradient-to-b from-beige to-beige-dark rounded-lg overflow-hidden relative shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_var(--color-cream)]">
			<!-- Top Metal Plate with Screws -->
			<div class="flex justify-between items-center px-4 py-2 bg-gradient-to-b from-tan to-tan-dark border-b border-brown-light">
				<!-- Corner Screws -->
				<div class="flex items-center gap-3">
					<div class="screw"></div>
					<div class="flex flex-col">
						<span class="font-mono text-[0.5rem] font-bold text-brown-dark tracking-[0.2em]">FT-AUDIO</span>
						<span class="font-mono text-[0.4rem] text-brown tracking-[0.1em]">STEREO CASSETTE DECK</span>
					</div>
				</div>
				<!-- Status LEDs -->
				<div class="flex items-center gap-3">
					<div class="flex items-center gap-1">
						<div class="led-rect active"></div>
						<span class="font-mono text-[0.4rem] text-brown-dark">POWER</span>
					</div>
					<div class="flex items-center gap-1">
						<div class="led-rect"></div>
						<span class="font-mono text-[0.4rem] text-brown">DOLBY NR</span>
					</div>
					<div class="screw"></div>
				</div>
			</div>

			<!-- Control Panel Header -->
			<div class="flex items-center justify-between px-5 py-3 bg-beige border-b-2 border-tan">
				<!-- Back Button - Mechanical Style -->
				<a href="/" class="deck-button group">
					<span class="deck-button-face">
						<span class="text-xs">&lt;</span>
						<span class="font-mono text-[0.5rem] font-bold tracking-wider hidden sm:inline">EJECT</span>
					</span>
				</a>

				<!-- Title Display - 7-Segment Style -->
				<div class="flex-1 mx-4">
					<div class="segment-display">
						<div class="segment-display-inner">
							<span class="font-mono text-lg font-bold tracking-[0.15em]">MUSIC</span>
						</div>
					</div>
				</div>

				<!-- Tape Counter -->
				<div class="hidden sm:block">
					<div class="tape-counter">
						<span class="font-mono text-[0.4rem] text-tan-dark block text-center mb-0.5">CASSETTES</span>
						<div class="counter-digits">
							<span>{data.folders.length.toString().padStart(3, '0')}</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Ventilation Strip -->
			<div class="vent-strip">
				{#each Array(28) as _}
					<div class="vent-slot"></div>
				{/each}
			</div>

			<!-- Main Cassette Bay -->
			<main class="p-5 bg-gradient-to-b from-cream to-beige-light relative">
				<!-- Textured background pattern -->
				<div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 1px, var(--color-brown) 1px, var(--color-brown) 2px);"></div>
				
				{#if data.folders.length === 0}
					<div class="empty-state">
						<div class="empty-display">
							<span class="font-mono text-sm text-display-text tracking-[0.1em]">NO TAPES FOUND</span>
						</div>
					</div>
				{:else}
					<!-- Cassette Players -->
					{#each data.folders as folder, i}
						<div class="mb-5 last:mb-0 animate-[deck-load_0.5s_ease-out_backwards]" style="animation-delay: {i * 0.15}s">
							<MusicPlayer tracks={folder.tracks} title={folder.name} />
						</div>
					{/each}
				{/if}
			</main>

			<!-- Transport Controls Bar -->
			<div class="transport-bar">
				<div class="flex items-center gap-3">
					<div class="screw small"></div>
					<div class="flex items-center gap-1">
						<div class="selector-switch">
							<span class="font-mono text-[0.35rem] text-brown block">TAPE</span>
							<div class="switch-track">
								<div class="switch-knob"></div>
							</div>
							<div class="flex justify-between">
								<span class="font-mono text-[0.3rem] text-tan-dark">I</span>
								<span class="font-mono text-[0.3rem] text-tan-dark">II</span>
							</div>
						</div>
					</div>
				</div>

				<div class="flex items-center gap-4">
					<span class="font-mono text-[0.45rem] text-brown tracking-[0.15em]">STEREO CASSETTE DECK</span>
					<span class="font-mono text-[0.4rem] text-tan-dark">MODEL FT-2026</span>
				</div>

				<div class="flex items-center gap-3">
					<RotaryKnob
						bind:value={outputVolume}
						label="OUTPUT"
						onchange={updateMusicPlayersVolume}
					/>
					<div class="screw small"></div>
				</div>
			</div>

			<!-- Bottom Rubber Feet Strip -->
			<div class="flex justify-between items-center px-6 py-1.5 bg-brown-dark">
				<div class="rubber-foot"></div>
				<div class="flex items-center gap-3">
					<span class="font-mono text-[0.4rem] text-tan tracking-[0.1em]">MADE IN NORWAY</span>
					<span class="font-mono text-[0.35rem] text-tan-dark">-</span>
					<span class="font-mono text-[0.4rem] text-tan tracking-[0.1em]">HI-FI MP3s</span>
				</div>
				<div class="rubber-foot"></div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Hardware Screw */
	.screw {
		width: 10px;
		height: 10px;
		background: linear-gradient(135deg, var(--color-cream) 0%, var(--color-tan) 50%, var(--color-tan-dark) 100%);
		border-radius: 50%;
		border: 1px solid var(--color-brown-light);
		position: relative;
		box-shadow: 
			inset 1px 1px 2px rgba(255,255,255,0.4),
			inset -1px -1px 2px rgba(0,0,0,0.2),
			0 1px 2px rgba(0,0,0,0.3);
	}
	.screw::before {
		content: '';
		position: absolute;
		top: 40%;
		left: 20%;
		right: 20%;
		height: 1px;
		background: var(--color-brown);
		transform: translateY(-10%);
		box-shadow: 0 0 1px rgba(0,0,0,0.3);
		rotate: -45deg;
	}
	.screw.small {
		width: 7px;
		height: 7px;
	}
	.screw.small::before {
		height: 1px;
	}

	/* Rectangular LED */
	.led-rect {
		width: 8px;
		height: 4px;
		background: var(--color-tan-dark);
		border: 1px solid var(--color-brown);
		border-radius: 1px;
		box-shadow: inset 0 1px 2px rgba(0,0,0,0.4);
	}
	.led-rect.active {
		background: var(--color-amber);
		box-shadow: 
			inset 0 1px 2px rgba(255,255,255,0.3),
			0 0 6px var(--color-amber-glow),
			0 0 12px var(--color-amber-glow);
		animation: led-glow 2s ease-in-out infinite;
	}

	/* Mechanical Deck Button */
	.deck-button {
		display: inline-block;
		padding: 2px;
		background: linear-gradient(180deg, var(--color-beige-dark) 0%, var(--color-tan-dark) 100%);
		border-radius: 4px;
		box-shadow: 
			0 3px 0 var(--color-brown),
			0 4px 4px rgba(0,0,0,0.3);
		transition: all 0.1s ease;
	}
	.deck-button:hover {
		box-shadow: 
			0 2px 0 var(--color-brown),
			0 3px 3px rgba(0,0,0,0.3);
		transform: translateY(1px);
	}
	.deck-button:active {
		box-shadow: 
			0 1px 0 var(--color-brown),
			0 1px 2px rgba(0,0,0,0.3);
		transform: translateY(2px);
	}
	.deck-button-face {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 6px 10px;
		background: linear-gradient(180deg, var(--color-cream) 0%, var(--color-beige) 100%);
		border-radius: 3px;
		color: var(--color-brown-dark);
		font-weight: 600;
		box-shadow: inset 0 1px 0 var(--color-cream);
	}

	/* Segment Display */
	.segment-display {
		background: var(--color-display);
		border: 3px solid var(--color-brown);
		border-radius: 4px;
		padding: 2px;
		box-shadow: 
			inset 0 2px 8px rgba(0,0,0,0.5),
			0 1px 0 var(--color-cream);
	}
	.segment-display-inner {
		background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%);
		padding: 6px 12px;
		color: var(--color-display-text);
		text-shadow: 0 0 10px var(--color-amber-glow);
		text-align: center;
	}

	/* Tape Counter */
	.tape-counter {
		background: var(--color-beige-dark);
		border: 2px solid var(--color-tan-dark);
		border-radius: 3px;
		padding: 4px 6px;
		box-shadow: inset 0 1px 3px rgba(0,0,0,0.2);
	}
	.counter-digits {
		background: var(--color-display);
		border: 1px solid var(--color-brown);
		padding: 2px 6px;
		border-radius: 2px;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: bold;
		color: var(--color-display-text);
		text-shadow: 0 0 6px var(--color-amber-glow);
		letter-spacing: 0.1em;
		box-shadow: inset 0 1px 4px rgba(0,0,0,0.4);
	}

	/* Ventilation Strip */
	.vent-strip {
		display: flex;
		justify-content: center;
		gap: 3px;
		padding: 6px 12px;
		background: linear-gradient(180deg, var(--color-beige-dark) 0%, var(--color-tan) 50%, var(--color-beige-dark) 100%);
		border-top: 1px solid var(--color-cream);
		border-bottom: 1px solid var(--color-tan-dark);
	}
	.vent-slot {
		width: 16px;
		height: 3px;
		background: var(--color-brown);
		border-radius: 1px;
		box-shadow: inset 0 1px 1px rgba(0,0,0,0.5);
	}

	/* Empty State */
	.empty-state {
		display: flex;
		justify-content: center;
		padding: 32px 0;
	}

	.empty-display {
		background: var(--color-display);
		border: 2px solid var(--color-brown);
		border-radius: 4px;
		padding: 12px 24px;
		box-shadow: inset 0 2px 6px rgba(0,0,0,0.4);
	}

	/* Transport Bar */
	.transport-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 16px;
		background: linear-gradient(180deg, var(--color-beige) 0%, var(--color-beige-dark) 100%);
		border-top: 1px solid var(--color-cream);
		border-bottom: 1px solid var(--color-tan);
	}

	/* Selector Switch */
	.selector-switch {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
	}
	.switch-track {
		width: 20px;
		height: 8px;
		background: var(--color-brown);
		border-radius: 4px;
		padding: 1px;
		box-shadow: inset 0 1px 2px rgba(0,0,0,0.4);
	}
	.switch-knob {
		width: 8px;
		height: 6px;
		background: linear-gradient(180deg, var(--color-cream) 0%, var(--color-tan) 100%);
		border-radius: 3px;
		box-shadow: 0 1px 2px rgba(0,0,0,0.3);
	}

	/* Rubber Foot */
	.rubber-foot {
		width: 20px;
		height: 6px;
		background: var(--color-brown);
		border-radius: 3px;
		box-shadow: inset 0 1px 2px rgba(255,255,255,0.1);
	}

	/* Animations */
	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	@keyframes led-glow {
		0%, 100% { box-shadow: inset 0 1px 2px rgba(255,255,255,0.3), 0 0 6px var(--color-amber-glow); }
		50% { box-shadow: inset 0 1px 2px rgba(255,255,255,0.3), 0 0 12px var(--color-amber-glow); }
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.3; }
	}

	@keyframes deck-load {
		from {
			opacity: 0;
			transform: translateY(10px) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
</style>
