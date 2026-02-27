<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		size?: 'full' | 'half';
		id?: string;
		variant?: 'default' | 'terminal' | 'display';
		children: Snippet;
	};

	let { title, size = 'full', id, variant = 'default', children }: Props = $props();
</script>

<section class="retro-section {size} {variant}" {id}>
	<div class="crt-frame">
		<div class="crt-bezel">
			<div class="bezel-left">
				<div class="bezel-brand">QUI</div>
				<div class="bezel-label">{title}</div>
			</div>
			<div class="bezel-right">
				<div class="bezel-indicator"></div>
				<div class="bezel-indicator secondary"></div>
			</div>
		</div>
		<div class="crt-screen">
			<div class="screen-inner">
				<div class="scanlines"></div>
				<div class="screen-noise"></div>
				<div class="screen-content">
					{@render children()}
				</div>
				<div class="screen-glare"></div>
				<div class="screen-vignette"></div>
			</div>
		</div>
		<div class="crt-bottom">
			<div class="crt-vents">
				<span></span><span></span><span></span><span></span><span></span><span></span><span></span>
			</div>
			<div class="crt-logo">cassette</div>
		</div>
	</div>
</section>

<style>
	.retro-section {
		--crt-bg: var(--color-brown-dark, #2e2a24);
		--crt-screen: var(--color-beige-light, #e8e4dc);
		--crt-bezel: var(--color-beige-dark, #b8b0a0);
		--crt-glow: var(--color-amber, #e89030);
		--crt-text: var(--color-brown, #4a4238);
		animation: section-enter 0.4s ease-out backwards;
	}

	@keyframes section-enter {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.retro-section.full {
		grid-column: 1 / -1;
	}

	.retro-section.half {
		grid-column: span 1;
	}

	@media (max-width: 600px) {
		.retro-section.half {
			grid-column: 1 / -1;
		}
	}

	.crt-frame {
		background: linear-gradient(
			160deg,
			#c8c0b4 0%,
			#b8b0a0 25%,
			#a89888 50%,
			#989080 75%,
			#887c70 100%
		);
		border-radius: 12px;
		padding: 10px 10px 8px 10px;
		box-shadow:
			inset 1px 1px 0 rgba(255, 255, 255, 0.4),
			inset -1px -1px 0 rgba(0, 0, 0, 0.15),
			0 4px 12px rgba(0, 0, 0, 0.25),
			0 2px 4px rgba(0, 0, 0, 0.15),
			0 0 0 1px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.crt-frame:hover {
		transform: translateY(-2px);
		box-shadow:
			inset 1px 1px 0 rgba(255, 255, 255, 0.4),
			inset -1px -1px 0 rgba(0, 0, 0, 0.15),
			0 8px 20px rgba(0, 0, 0, 0.3),
			0 4px 8px rgba(0, 0, 0, 0.2),
			0 0 0 1px rgba(0, 0, 0, 0.1);
	}

	.crt-bezel {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 2px 8px 6px 8px;
	}

	.bezel-left {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.bezel-brand {
		font-family: var(--font-mono, 'Consolas', monospace);
		font-size: 0.5rem;
		font-weight: 700;
		color: var(--color-brown-dark, #2e2a24);
		background: linear-gradient(180deg, #d0c8bc 0%, #a8a090 100%);
		padding: 2px 6px;
		border-radius: 2px;
		letter-spacing: 0.2em;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.5),
			0 1px 2px rgba(0, 0, 0, 0.2);
	}

	.bezel-label {
		font-family: var(--font-mono, 'Consolas', monospace);
		font-size: 0.55rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--color-brown-dark, #2e2a24);
		text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);
	}

	.bezel-right {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.bezel-indicator {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: radial-gradient(circle at 30% 30%, #8a8070, #5a5448);
		box-shadow:
			inset 0 1px 2px rgba(0, 0, 0, 0.5),
			0 0 0 1px rgba(0, 0, 0, 0.2);
		animation: indicator-pulse 3s ease-in-out infinite;
	}

	.bezel-indicator.secondary {
		animation-delay: 1.5s;
		width: 5px;
		height: 5px;
	}

	@keyframes indicator-pulse {
		0%, 40%, 100% {
			background: radial-gradient(circle at 30% 30%, #8a8070, #5a5448);
			box-shadow:
				inset 0 1px 2px rgba(0, 0, 0, 0.5),
				0 0 0 1px rgba(0, 0, 0, 0.2);
		}
		50%, 55% {
			background: radial-gradient(circle at 30% 30%, #f0a040, #c07020);
			box-shadow:
				inset 0 1px 2px rgba(0, 0, 0, 0.3),
				0 0 6px rgba(232, 144, 48, 0.6),
				0 0 0 1px rgba(0, 0, 0, 0.2);
		}
	}

	.crt-screen {
		position: relative;
		background: #1a1814;
		border-radius: 8px;
		padding: 3px;
		box-shadow:
			inset 0 0 0 2px #0a0808,
			0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.screen-inner {
		position: relative;
		background: var(--crt-screen);
		border-radius: 6px;
		overflow: hidden;
		box-shadow:
			inset 0 0 40px rgba(0, 0, 0, 0.12),
			inset 0 0 10px rgba(0, 0, 0, 0.08);
	}

	.scanlines {
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			0deg,
			transparent 0px,
			transparent 1px,
			rgba(0, 0, 0, 0.015) 1px,
			rgba(0, 0, 0, 0.015) 2px
		);
		pointer-events: none;
		z-index: 3;
	}

	.screen-noise {
		position: absolute;
		inset: 0;
		opacity: 0.02;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E");
		pointer-events: none;
		z-index: 2;
		animation: noise-shift 0.5s steps(5) infinite;
	}

	@keyframes noise-shift {
		0% { transform: translate(0, 0); }
		20% { transform: translate(-1px, 1px); }
		40% { transform: translate(1px, -1px); }
		60% { transform: translate(-1px, -1px); }
		80% { transform: translate(1px, 1px); }
		100% { transform: translate(0, 0); }
	}

	.screen-content {
		position: relative;
		padding: 0.875rem 1rem;
		z-index: 1;
		font-size: 0.8rem;
		line-height: 1.6;
		color: var(--crt-text);
	}

	.screen-content :global(h3) {
		font-family: var(--font-mono, 'Consolas', monospace);
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--color-brown-dark, #2e2a24);
		margin: 0.875rem 0 0.5rem 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.screen-content :global(h3::before) {
		content: '> ';
		color: var(--color-amber, #e89030);
	}

	.screen-content :global(p) {
		font-size: 0.8rem;
		line-height: 1.6;
		color: var(--color-brown, #4a4238);
		margin: 0.5rem 0;
	}

	.screen-content :global(.entry) {
		display: flex;
		gap: 0.75rem;
		font-size: 0.75rem;
		padding: 0.4rem 0;
		border-bottom: 1px dashed var(--color-tan, #a89880);
		transition: background 0.15s ease;
	}

	.screen-content :global(.entry:hover) {
		background: rgba(168, 152, 128, 0.1);
	}

	.screen-content :global(.entry:last-child) {
		border-bottom: none;
	}

	.screen-content :global(.entry .date) {
		color: var(--color-amber-dim, #c07828);
		font-family: var(--font-mono, 'Consolas', monospace);
		font-size: 0.65rem;
		flex-shrink: 0;
		font-weight: 500;
	}

	.screen-content :global(.entry .text) {
		color: var(--color-brown, #4a4238);
	}

	.screen-content :global(.status-item) {
		display: flex;
		gap: 0.5rem;
		font-size: 0.75rem;
		margin: 0.35rem 0;
		padding: 0.2rem 0;
	}

	.screen-content :global(.status-item .label) {
		color: var(--color-amber-dim, #c07828);
		font-family: var(--font-mono, 'Consolas', monospace);
		font-size: 0.65rem;
		text-transform: uppercase;
		font-weight: 500;
		min-width: 70px;
	}

	.screen-content :global(.status-item .label::after) {
		content: '';
	}

	.screen-content :global(.status-item .value) {
		color: var(--color-brown-dark, #2e2a24);
		font-weight: 500;
	}

	.screen-content :global(.lastfm-widget) {
		margin: 0.25rem 0 0.5rem 0;
	}

	.screen-content :global(.btn) {
		font-family: var(--font-mono, 'Consolas', monospace);
		font-size: 0.65rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 0.5rem 1rem;
		background: linear-gradient(180deg, #d8d0c4 0%, #c0b8a8 100%);
		border: 2px solid var(--color-tan-dark, #8a7c68);
		color: var(--color-brown-dark, #2e2a24);
		cursor: pointer;
		border-radius: 4px;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.5),
			0 2px 4px rgba(0, 0, 0, 0.15);
		transition: all 0.15s ease;
	}

	.screen-content :global(.btn:hover) {
		background: linear-gradient(180deg, #f0a040 0%, #d08030 100%);
		border-color: var(--color-amber-dim, #c07828);
		color: var(--color-brown-dark, #2e2a24);
		transform: translateY(-1px);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.3),
			0 4px 8px rgba(0, 0, 0, 0.2);
	}

	.screen-content :global(.btn:active) {
		transform: translateY(0);
		box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.screen-content :global(.webring) {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		background: linear-gradient(180deg, #e0d8cc 0%, #c8c0b4 100%);
		border: 2px solid var(--color-tan-dark, #8a7c68);
		border-radius: 6px;
		font-size: 0.7rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.screen-content :global(.webring a) {
		color: var(--color-brown-dark, #2e2a24);
		text-decoration: none;
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--color-tan, #a89880);
		border-radius: 3px;
		background: var(--color-cream, #f0ebe0);
		font-weight: 600;
		transition: all 0.15s ease;
	}

	.screen-content :global(.webring a:hover) {
		background: var(--color-amber, #e89030);
		border-color: var(--color-amber-dim, #c07828);
		color: var(--color-brown-dark, #2e2a24);
	}

	.screen-content :global(.webring .name) {
		color: var(--color-brown-dark, #2e2a24);
		font-weight: 500;
		font-family: var(--font-mono, 'Consolas', monospace);
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.screen-content :global(.badge-grid) {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		padding: 0.625rem;
		background: linear-gradient(180deg, #d8d0c4 0%, #c8c0b4 100%);
		border: 2px inset var(--color-tan, #a89880);
		border-radius: 4px;
	}

	.screen-content :global(.badge-88x31) {
		width: 88px;
		height: 31px;
		image-rendering: pixelated;
		border: 1px solid var(--color-tan, #a89880);
		transition: all 0.15s ease;
	}

	.screen-content :global(.badge-88x31:hover) {
		border-color: var(--color-amber, #e89030);
		transform: scale(1.05);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	.screen-content :global(a) {
		color: var(--color-rust, #a05030);
		text-decoration: none;
		transition: color 0.15s ease;
	}

	.screen-content :global(a:hover) {
		color: var(--color-amber, #e89030);
	}

	.screen-glare {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 50%;
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.06) 0%,
			rgba(255, 255, 255, 0.02) 30%,
			transparent 100%
		);
		pointer-events: none;
		z-index: 4;
		border-radius: 6px 6px 0 0;
	}

	.screen-vignette {
		position: absolute;
		inset: 0;
		box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.08);
		pointer-events: none;
		z-index: 5;
		border-radius: 6px;
	}

	.crt-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 6px 8px 2px 8px;
	}

	.crt-vents {
		display: flex;
		gap: 4px;
	}

	.crt-vents span {
		width: 16px;
		height: 2px;
		background: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0.3) 0%,
			rgba(0, 0, 0, 0.15) 50%,
			rgba(255, 255, 255, 0.1) 100%
		);
		border-radius: 1px;
	}

	.crt-logo {
		font-family: var(--font-mono, 'Consolas', monospace);
		font-size: 0.45rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--color-brown-dark, #2e2a24);
		opacity: 0.5;
	}

	/* Terminal variant */
	.retro-section.terminal .screen-inner {
		background: #1e1c18;
	}

	.retro-section.terminal .screen-content {
		color: var(--color-amber, #e89030);
		font-family: var(--font-mono, 'Consolas', monospace);
	}

	.retro-section.terminal .screen-content :global(p) {
		color: var(--color-amber, #e89030);
	}

	/* Display variant */
	.retro-section.display .screen-inner {
		background: var(--color-display, #2e2a24);
	}

	.retro-section.display .screen-content {
		color: var(--color-display-text, #e8a040);
		font-family: var(--font-mono, 'Consolas', monospace);
		text-shadow: 0 0 8px rgba(232, 160, 64, 0.4);
	}

	.retro-section.display .screen-content :global(p) {
		color: var(--color-display-text, #e8a040);
	}

	.retro-section.display .scanlines {
		background: repeating-linear-gradient(
			0deg,
			transparent 0px,
			transparent 2px,
			rgba(0, 0, 0, 0.1) 2px,
			rgba(0, 0, 0, 0.1) 4px
		);
	}
</style>
