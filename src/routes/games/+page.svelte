<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const siteName = 'quiescent';
</script>

<svelte:head>
	<title>games | {siteName}</title>
	<meta name="description" content="PICO-8 games" />
</svelte:head>

<div class="games-page">
	<div class="games-cabinet">
		<div class="cabinet-header">
			<span class="cabinet-label">arcade</span>
			<div class="cabinet-leds">
				<span class="led"></span>
				<span class="led active"></span>
			</div>
		</div>

		<div class="cabinet-screen">
			<div class="screen-content">
				<h1>games</h1>
				<p class="subtitle">bestest games ever</p>

				{#if data.games.length === 0}
					<div class="no-games">
						<p>no games found</p>
						<p class="hint">drop pico-8 exports into <code>static/games/</code></p>
					</div>
				{:else}
					<div class="game-list">
						{#each data.games as game}
							<a href="/games/{game.slug}" class="game-cartridge">
								<div class="cartridge-top">
									<span class="cartridge-notch"></span>
									<span class="cartridge-notch"></span>
								</div>
								<div class="cartridge-label" class:has-image={game.label}>
									{#if game.label}
										<img 
											src="/games/{game.slug}/{game.label}" 
											alt="{game.name} label" 
											class="label-image"
										/>
										<div class="label-overlay">
											<span class="label-play-btn">▶ play</span>
										</div>
									{:else}
										<div class="label-header">
											<span class="label-brand">PICO-8</span>
											<span class="label-led"></span>
										</div>
										<div class="label-title">{game.name}</div>
										<div class="label-footer">
											<span class="label-id">{game.slug}</span>
											<span class="label-play">▶ play</span>
										</div>
									{/if}
								</div>
								<div class="cartridge-bottom">
									<span class="cartridge-title">{game.name}</span>
								</div>
								<div class="cartridge-pins">
									<span></span><span></span><span></span><span></span>
								</div>
							</a>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<div class="cabinet-vents">
			<span></span><span></span><span></span><span></span><span></span>
		</div>
	</div>
</div>

<style>
	.games-page {
		min-height: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: 1rem;
		overflow-x: hidden;
	}

	@media (max-width: 600px) {
		.games-page {
			padding: 0.75rem;
		}
	}

	.games-cabinet {
		width: 100%;
		max-width: 680px;
		background: linear-gradient(160deg, #c8c0b4 0%, #a89888 50%, #887c70 100%);
		border-radius: 12px;
		overflow: hidden;
		box-shadow:
			0 8px 32px rgba(0, 0, 0, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
	}

	.cabinet-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1rem;
		background: linear-gradient(180deg, #5c544a 0%, #4a4238 100%);
		border-bottom: 2px solid #2e2a24;
	}

	.cabinet-label {
		font-family: var(--font-mono);
		font-size: 0.6rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: #d4cdc0;
	}

	.cabinet-leds {
		display: flex;
		gap: 6px;
	}

	.led {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #5a5448;
		box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
	}

	.led.active {
		background: #e89030;
		box-shadow:
			inset 0 1px 2px rgba(0, 0, 0, 0.2),
			0 0 8px rgba(232, 144, 48, 0.6);
	}

	.cabinet-screen {
		margin: 0.75rem;
		background: #1a1814;
		border-radius: 8px;
		padding: 4px;
		box-shadow: inset 0 0 0 2px #0a0808;
	}

	.screen-content {
		background: #2e2a24;
		border-radius: 6px;
		padding: 1.25rem;
		min-height: 250px;
		color: #e8a040;
		font-family: var(--font-mono);
		position: relative;
		overflow: hidden;
	}

	.screen-content::before {
		content: '';
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			0deg,
			transparent 0px,
			transparent 2px,
			rgba(0, 0, 0, 0.05) 2px,
			rgba(0, 0, 0, 0.05) 4px
		);
		pointer-events: none;
		z-index: 0;
	}

	.screen-content h1 {
		font-size: 1.25rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0 0 0.25rem 0;
		text-shadow: 0 0 10px rgba(232, 160, 64, 0.5);
		position: relative;
		z-index: 1;
	}

	.subtitle {
		font-size: 0.6rem;
		color: #a89880;
		margin: 0 0 1.25rem 0;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		position: relative;
		z-index: 1;
	}

	.no-games {
		padding: 2rem 0;
		text-align: center;
		position: relative;
		z-index: 1;
	}

	.no-games p {
		margin: 0.5rem 0;
		font-size: 0.8rem;
	}

	.no-games .hint {
		color: #8a7c68;
		font-size: 0.7rem;
	}

	.no-games code {
		background: rgba(232, 160, 64, 0.15);
		padding: 0.15rem 0.4rem;
		border-radius: 3px;
		font-size: 0.65rem;
	}

	.game-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: 0.75rem;
		position: relative;
		z-index: 1;
	}

	@media (min-width: 480px) {
		.game-list {
			grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
			gap: 1rem;
		}
	}

	.game-cartridge {
		display: flex;
		flex-direction: column;
		background: linear-gradient(180deg, #3a3632 0%, #2a2826 100%);
		border-radius: 6px 6px 3px 3px;
		text-decoration: none;
		transition: all 0.2s ease;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
	}

	.game-cartridge:hover {
		transform: translateY(-4px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
	}

	.cartridge-top {
		display: flex;
		justify-content: space-between;
		padding: 0 8px;
		height: 6px;
		background: #4a4642;
		border-radius: 6px 6px 0 0;
	}

	.cartridge-notch {
		width: 12px;
		height: 4px;
		background: #2a2826;
		border-radius: 0 0 2px 2px;
		margin-top: -1px;
	}

	.cartridge-label {
		margin: 6px;
		padding: 8px;
		background: linear-gradient(135deg, #e8a040 0%, #c07828 100%);
		border-radius: 3px;
		min-height: 80px;
		display: flex;
		flex-direction: column;
		position: relative;
		overflow: hidden;
	}

	@media (min-width: 480px) {
		.cartridge-label {
			min-height: 100px;
		}
	}

	.cartridge-label.has-image {
		padding: 0;
		background: #1a1814;
	}

	.label-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		image-rendering: pixelated;
		display: block;
		min-height: 80px;
	}

	@media (min-width: 480px) {
		.label-image {
			min-height: 100px;
		}
	}

	.label-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.game-cartridge:hover .label-overlay {
		opacity: 1;
	}

	.label-play-btn {
		color: #e8a040;
		font-size: 0.7rem;
		background: rgba(0, 0, 0, 0.5);
		padding: 0.4rem 0.8rem;
		border-radius: 3px;
		border: 1px solid #e8a040;
	}

	.label-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 6px;
	}

	.label-brand {
		font-family: var(--font-mono);
		font-size: 0.4rem;
		font-weight: 700;
		color: #2e2a24;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		background: rgba(0, 0, 0, 0.15);
		padding: 2px 4px;
		border-radius: 2px;
	}

	.label-led {
		width: 5px;
		height: 5px;
		background: #2e2a24;
		border-radius: 50%;
		box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2);
	}

	.game-cartridge:hover .label-led {
		background: #4ade80;
		box-shadow: 0 0 6px rgba(74, 222, 128, 0.6);
	}

	.label-title {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-mono);
		font-size: 0.6rem;
		font-weight: 700;
		color: #2e2a24;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		line-height: 1.2;
	}

	@media (min-width: 480px) {
		.label-title {
			font-size: 0.7rem;
		}
	}

	.label-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 6px;
		padding-top: 4px;
		border-top: 1px solid rgba(0, 0, 0, 0.15);
	}

	.label-id {
		font-family: var(--font-mono);
		font-size: 0.35rem;
		color: #5c544a;
		text-transform: uppercase;
	}

	.label-play {
		font-family: var(--font-mono);
		font-size: 0.4rem;
		font-weight: 600;
		color: #2e2a24;
		text-transform: uppercase;
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.game-cartridge:hover .label-play {
		opacity: 1;
	}

	.cartridge-bottom {
		padding: 4px 8px;
		background: #3a3632;
	}

	.cartridge-title {
		font-family: var(--font-mono);
		font-size: 0.45rem;
		font-weight: 600;
		color: #a89880;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		display: block;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.cartridge-pins {
		display: flex;
		justify-content: center;
		gap: 4px;
		padding: 4px 8px 6px;
		background: #2a2826;
		border-radius: 0 0 3px 3px;
	}

	.cartridge-pins span {
		width: 8px;
		height: 3px;
		background: linear-gradient(180deg, #6a6460 0%, #4a4642 100%);
		border-radius: 1px;
	}

	.cabinet-vents {
		display: flex;
		justify-content: center;
		gap: 6px;
		padding: 0.75rem;
		background: linear-gradient(180deg, #a89888 0%, #887c70 100%);
	}

	.cabinet-vents span {
		width: 24px;
		height: 3px;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 50%, rgba(255, 255, 255, 0.1) 100%);
		border-radius: 1px;
	}
</style>
