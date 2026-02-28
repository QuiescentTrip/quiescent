<script lang="ts">
	import { onMount } from 'svelte';
	import { MusicPlayer } from '$lib/components/features';
	import { RotaryKnob } from '$lib/components/ui';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const siteName = 'quiescent';
	const siteAuthor = 'quiescent';

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
	<title>music | {siteName}</title>
	<meta name="description" content="Music by {siteAuthor}" />
</svelte:head>

<!-- Cassette Deck Unit -->
<div class="cassette-page">
	<div class="cassette-deck">
		<!-- Top Metal Plate with Screws -->
		<div class="deck-top-plate">
			<div class="plate-left">
				<div class="screw"></div>
				<div class="brand-text">
					<span class="brand-name">Realtime</span>
					<span class="brand-sub">STEREO CASSETTE DECK</span>
				</div>
			</div>
			<div class="plate-right">
				<div class="led-group">
					<div class="led-rect active"></div>
					<span class="led-label">POWER</span>
				</div>
				<div class="led-group hide-mobile">
					<div class="led-rect"></div>
					<span class="led-label dim">DOLBY NR</span>
				</div>
				<div class="screw"></div>
			</div>
		</div>

		<!-- Control Panel Header -->
		<div class="deck-header">
			<div class="segment-display">
				<div class="segment-display-inner">
					<span class="segment-text">MUSIC</span>
				</div>
			</div>

			<div class="tape-counter hide-mobile">
				<span class="counter-label">CASSETTES</span>
				<div class="counter-digits">
					<span>{data.folders.length.toString().padStart(3, '0')}</span>
				</div>
			</div>
		</div>

		<!-- Ventilation Strip -->
		<div class="vent-strip">
			{#each Array(20) as _}
				<div class="vent-slot"></div>
			{/each}
		</div>

		<!-- Main Cassette Bay -->
		<div class="deck-main">
			{#if data.folders.length === 0}
				<div class="empty-state">
					<div class="empty-display">
						<span>NO TAPES FOUND</span>
					</div>
				</div>
			{:else}
				{#each data.folders as folder, i}
					<div class="player-container" style="animation-delay: {i * 0.15}s">
						<MusicPlayer tracks={folder.tracks} title={folder.name} />
					</div>
				{/each}
			{/if}
		</div>

		<!-- Transport Controls Bar -->
		<div class="transport-bar">
			<div class="transport-left">
				<div class="screw small"></div>
				<div class="selector-switch hide-mobile">
					<span class="switch-label">TAPE</span>
					<div class="switch-track">
						<div class="switch-knob"></div>
					</div>
					<div class="switch-positions">
						<span>I</span>
						<span>II</span>
					</div>
				</div>
			</div>

			<div class="transport-center hide-mobile">
				<span class="model-text">STEREO CASSETTE DECK</span>
				<span class="model-number">MODEL Q-2026</span>
			</div>

			<div class="transport-right">
				<RotaryKnob
					bind:value={outputVolume}
					label="OUTPUT"
					onchange={updateMusicPlayersVolume}
				/>
				<div class="screw small"></div>
			</div>
		</div>

		<!-- Bottom Rubber Feet Strip -->
		<div class="deck-footer">
			<div class="rubber-foot"></div>
			<div class="footer-text">
				<span>MADE IN CHINA</span>
				<span class="separator">-</span>
				<span>HI-FI MP3s</span>
			</div>
			<div class="rubber-foot"></div>
		</div>
	</div>
</div>

<style>
	.cassette-page {
		min-height: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: 1rem;
		overflow-x: hidden;
	}

	@media (max-width: 600px) {
		.cassette-page {
			padding: 0.75rem;
		}
	}

	.cassette-deck {
		width: 100%;
		max-width: 680px;
		background: linear-gradient(to bottom, var(--color-beige), var(--color-beige-dark));
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 var(--color-cream);
	}

	/* Top Plate */
	.deck-top-plate {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0.75rem;
		background: linear-gradient(to bottom, var(--color-tan), var(--color-tan-dark));
		border-bottom: 1px solid var(--color-brown-light);
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.plate-left, .plate-right {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.brand-text {
		display: flex;
		flex-direction: column;
	}

	.brand-name {
		font-family: var(--font-mono);
		font-size: 0.5rem;
		font-weight: bold;
		color: var(--color-brown-dark);
		letter-spacing: 0.2em;
	}

	.brand-sub {
		font-family: var(--font-mono);
		font-size: 0.35rem;
		color: var(--color-brown);
		letter-spacing: 0.1em;
	}

	.led-group {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.led-label {
		font-family: var(--font-mono);
		font-size: 0.4rem;
		color: var(--color-brown-dark);
	}

	.led-label.dim {
		color: var(--color-brown);
	}

	/* Deck Header */
	.deck-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem;
		background: var(--color-beige);
		border-bottom: 2px solid var(--color-tan);
		gap: 0.75rem;
	}

	.segment-display {
		flex: 1;
		background: var(--color-display);
		border: 3px solid var(--color-brown);
		border-radius: 4px;
		padding: 2px;
		box-shadow: inset 0 2px 8px rgba(0,0,0,0.5), 0 1px 0 var(--color-cream);
	}

	.segment-display-inner {
		background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%);
		padding: 6px 12px;
		text-align: center;
	}

	.segment-text {
		font-family: var(--font-mono);
		font-size: 1.1rem;
		font-weight: bold;
		letter-spacing: 0.15em;
		color: var(--color-display-text);
		text-shadow: 0 0 10px var(--color-amber-glow);
	}

	.tape-counter {
		background: var(--color-beige-dark);
		border: 2px solid var(--color-tan-dark);
		border-radius: 3px;
		padding: 4px 6px;
		box-shadow: inset 0 1px 3px rgba(0,0,0,0.2);
	}

	.counter-label {
		font-family: var(--font-mono);
		font-size: 0.4rem;
		color: var(--color-tan-dark);
		display: block;
		text-align: center;
		margin-bottom: 2px;
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

	/* Vent Strip */
	.vent-strip {
		display: flex;
		justify-content: center;
		gap: 3px;
		padding: 6px 8px;
		background: linear-gradient(180deg, var(--color-beige-dark) 0%, var(--color-tan) 50%, var(--color-beige-dark) 100%);
		border-top: 1px solid var(--color-cream);
		border-bottom: 1px solid var(--color-tan-dark);
		flex-wrap: wrap;
		overflow: hidden;
	}

	.vent-slot {
		width: 14px;
		height: 3px;
		background: var(--color-brown);
		border-radius: 1px;
		box-shadow: inset 0 1px 1px rgba(0,0,0,0.5);
		flex-shrink: 0;
	}

	/* Main Content */
	.deck-main {
		padding: 1rem;
		background: linear-gradient(to bottom, var(--color-cream), var(--color-beige-light));
		position: relative;
	}

	.deck-main::before {
		content: '';
		position: absolute;
		inset: 0;
		opacity: 0.03;
		pointer-events: none;
		background-image: repeating-linear-gradient(0deg, transparent, transparent 1px, var(--color-brown) 1px, var(--color-brown) 2px);
	}

	.player-container {
		margin-bottom: 1rem;
		animation: deck-load 0.5s ease-out backwards;
	}

	.player-container:last-child {
		margin-bottom: 0;
	}

	.empty-state {
		display: flex;
		justify-content: center;
		padding: 2rem 0;
	}

	.empty-display {
		background: var(--color-display);
		border: 2px solid var(--color-brown);
		border-radius: 4px;
		padding: 12px 24px;
		box-shadow: inset 0 2px 6px rgba(0,0,0,0.4);
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--color-display-text);
		letter-spacing: 0.1em;
	}

	/* Transport Bar */
	.transport-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 12px;
		background: linear-gradient(180deg, var(--color-beige) 0%, var(--color-beige-dark) 100%);
		border-top: 1px solid var(--color-cream);
		border-bottom: 1px solid var(--color-tan);
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.transport-left, .transport-right {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.transport-center {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.model-text {
		font-family: var(--font-mono);
		font-size: 0.45rem;
		color: var(--color-brown);
		letter-spacing: 0.15em;
	}

	.model-number {
		font-family: var(--font-mono);
		font-size: 0.4rem;
		color: var(--color-tan-dark);
	}

	.selector-switch {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
	}

	.switch-label {
		font-family: var(--font-mono);
		font-size: 0.35rem;
		color: var(--color-brown);
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

	.switch-positions {
		display: flex;
		justify-content: space-between;
		width: 20px;
		font-family: var(--font-mono);
		font-size: 0.3rem;
		color: var(--color-tan-dark);
	}

	/* Footer */
	.deck-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 6px 1rem;
		background: var(--color-brown-dark);
	}

	.footer-text {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.4rem;
		color: var(--color-tan);
		letter-spacing: 0.1em;
	}

	.footer-text .separator {
		color: var(--color-tan-dark);
	}

	.rubber-foot {
		width: 20px;
		height: 6px;
		background: var(--color-brown);
		border-radius: 3px;
		box-shadow: inset 0 1px 2px rgba(255,255,255,0.1);
	}

	/* Screws */
	.screw {
		width: 10px;
		height: 10px;
		background: linear-gradient(135deg, var(--color-cream) 0%, var(--color-tan) 50%, var(--color-tan-dark) 100%);
		border-radius: 50%;
		border: 1px solid var(--color-brown-light);
		position: relative;
		flex-shrink: 0;
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
		transform: translateY(-10%) rotate(-45deg);
		box-shadow: 0 0 1px rgba(0,0,0,0.3);
	}

	.screw.small {
		width: 7px;
		height: 7px;
	}

	/* LEDs */
	.led-rect {
		width: 8px;
		height: 4px;
		background: var(--color-tan-dark);
		border: 1px solid var(--color-brown);
		border-radius: 1px;
		box-shadow: inset 0 1px 2px rgba(0,0,0,0.4);
		flex-shrink: 0;
	}

	.led-rect.active {
		background: var(--color-amber);
		box-shadow: 
			inset 0 1px 2px rgba(255,255,255,0.3),
			0 0 6px var(--color-amber-glow),
			0 0 12px var(--color-amber-glow);
		animation: led-glow 2s ease-in-out infinite;
	}

	/* Utilities */
	.hide-mobile {
		display: none;
	}

	@media (min-width: 480px) {
		.hide-mobile {
			display: flex;
		}

		.segment-text {
			font-size: 1.25rem;
		}

		.vent-slot {
			width: 16px;
		}
	}

	/* Animations */
	@keyframes led-glow {
		0%, 100% { box-shadow: inset 0 1px 2px rgba(255,255,255,0.3), 0 0 6px var(--color-amber-glow); }
		50% { box-shadow: inset 0 1px 2px rgba(255,255,255,0.3), 0 0 12px var(--color-amber-glow); }
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
