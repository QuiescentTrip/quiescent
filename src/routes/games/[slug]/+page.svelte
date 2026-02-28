<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const siteName = 'quiescent';
	
	let gameSrc = $derived(`/games/${data.slug}/${data.htmlFile}`);
	
	let isFullscreen = $state(false);

	function toggleFullscreen() {
		isFullscreen = !isFullscreen;
	}
</script>

<svelte:head>
	<title>{data.name} | {siteName}</title>
	<meta name="description" content="Play {data.name}" />
</svelte:head>

{#if isFullscreen}
	<!-- Fullscreen Mode -->
	<div class="fullscreen-overlay">
		<div class="fullscreen-cabinet">
			<div class="cabinet-header">
				<button class="header-btn" onclick={toggleFullscreen}>← exit</button>
				<span class="game-title">{data.name}</span>
				<div></div>
			</div>

			<div class="fullscreen-screen">
				<iframe
					src={gameSrc}
					title={data.name}
					class="game-frame"
					allowfullscreen
				></iframe>
			</div>
		</div>
	</div>
{/if}

<!-- Normal Mode -->
<div class="game-page" class:hidden={isFullscreen}>
	<div class="game-cabinet">
		<div class="cabinet-header">
			<a href="/games" class="header-btn">← games</a>
			<span class="game-title">{data.name}</span>
			<button class="fullscreen-btn" onclick={toggleFullscreen}>
				fullscreen
			</button>
		</div>

		<div class="cabinet-screen">
			<iframe
				src={gameSrc}
				title={data.name}
				class="game-frame"
				allowfullscreen
			></iframe>
		</div>

		<div class="cabinet-controls">
			<div class="control-hint">
				<span class="key">arrows</span> move
				<span class="key">z</span> / <span class="key">x</span> action
			</div>
		</div>
	</div>
</div>

<style>
	.game-page {
		min-height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	@media (max-width: 600px) {
		.game-page {
			padding: 0.75rem;
		}
	}

	.game-page.hidden {
		display: none;
	}

	.fullscreen-overlay {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background: #1a1814;
		display: flex;
		align-items: stretch;
		justify-content: center;
	}

	.game-cabinet, .fullscreen-cabinet {
		width: 100%;
		max-width: 560px;
		background: linear-gradient(160deg, #c8c0b4 0%, #a89888 50%, #887c70 100%);
		border-radius: 12px;
		overflow: hidden;
		box-shadow:
			0 8px 32px rgba(0, 0, 0, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
	}

	.fullscreen-cabinet {
		max-width: none;
		height: 100%;
		width: 100%;
		border-radius: 0;
		display: flex;
		flex-direction: column;
	}

	.cabinet-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 0.75rem;
		background: linear-gradient(180deg, #5c544a 0%, #4a4238 100%);
		border-bottom: 2px solid #2e2a24;
		gap: 0.5rem;
	}

	.header-btn {
		font-family: var(--font-mono);
		font-size: 0.55rem;
		font-weight: 500;
		color: #a89880;
		text-decoration: none;
		background: none;
		border: none;
		padding: 0.25rem 0.5rem;
		border-radius: 3px;
		cursor: pointer;
		transition: all 0.2s ease;
		min-width: 60px;
		text-align: left;
	}

	.header-btn:hover {
		color: #e8a040;
		background: rgba(232, 160, 64, 0.1);
	}

	.game-title {
		font-family: var(--font-mono);
		font-size: 0.55rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #d4cdc0;
		text-align: center;
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	@media (min-width: 480px) {
		.game-title {
			font-size: 0.6rem;
		}
	}

	.fullscreen-btn {
		font-family: var(--font-mono);
		font-size: 0.5rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #a89880;
		background: rgba(0, 0, 0, 0.2);
		border: 1px solid rgba(168, 152, 128, 0.3);
		border-radius: 3px;
		cursor: pointer;
		padding: 0.25rem 0.5rem;
		transition: all 0.2s ease;
	}

	.fullscreen-btn:hover {
		color: #e8a040;
		background: rgba(232, 160, 64, 0.15);
		border-color: rgba(232, 160, 64, 0.4);
	}

	.cabinet-screen {
		background: #0a0808;
		margin: 0.75rem;
		border-radius: 6px;
		overflow: hidden;
		aspect-ratio: 1 / 1;
	}

	.fullscreen-screen {
		flex: 1;
		background: #0a0808;
	}

	.game-frame {
		width: 100%;
		height: 100%;
		border: none;
		display: block;
		image-rendering: pixelated;
	}

	.cabinet-controls {
		padding: 0.5rem 0.75rem;
		background: linear-gradient(180deg, #a89888 0%, #887c70 100%);
		text-align: center;
	}

	.control-hint {
		font-family: var(--font-mono);
		font-size: 0.45rem;
		color: #5c544a;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	@media (min-width: 480px) {
		.control-hint {
			font-size: 0.5rem;
		}
	}

	.key {
		display: inline-block;
		background: #d4cdc0;
		border: 1px solid #a89880;
		border-radius: 2px;
		padding: 0.1rem 0.3rem;
		margin: 0 0.15rem;
		font-weight: 600;
		color: #4a4238;
	}
</style>
