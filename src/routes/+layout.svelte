<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import FancyButton from '$lib/components/ui/fancyButton.svelte';
	import { page } from '$app/stores';

	let { children } = $props();

	const navLinks = ['/', '/blog', '/music', '/games'];
	const navNames = ['home', 'blog', 'music', 'games'];

	function isActive(href: string, pathname: string): boolean {
		if (href === '/') return pathname === '/';
		return pathname.startsWith(href);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Desktop Layout -->
<div class="desktop-wrapper font-body">
	<div class="desktop-container">
		<!-- Nav Island (Cassette Deck Style) -->
		<aside class="nav-island">
			<!-- Top plate with screws -->
			<div class="deck-plate">
				<div class="screw"></div>
				<div class="screw"></div>
			</div>

			<!-- Display header -->
			<header class="nav-header">
				<a href="/" class="nav-brand">
					<div class="brand-display">
						<span class="brand-title">quiescent</span>
					</div>
				</a>
				<div class="header-leds">
					<div class="led active"></div>
				</div>
			</header>

			<!-- Navigation links -->
			<nav class="nav-links">
				<div class="nav-section-label">
					<span class="label-text">where to</span>
					<div class="label-line"></div>
				</div>
				{#each navLinks as href, i}
					<FancyButton {href} text={navNames[i]} />
				{/each}
			</nav>


			<!-- Extras -->
			<div class="nav-extras">
				<iframe title="neocity ad" width="155" height="155" style="border:none" src="https://dimden.neocities.org/navlink/" name="neolink"></iframe>
			</div>

			<!-- Cassette window -->
			<div class="cassette-window">
				<div class="window-frame">
					<div class="tape-reels">
						<div class="reel left"></div>
						<div class="reel right"></div>
					</div>
					<img alt="cassette tape" src="/images/gif/cassette tape GIF.gif" class="cassette-img">
				</div>
			</div>

			<!-- Bottom plate -->
			<div class="deck-plate bottom">
				<div class="screw small"></div>
				<div class="date-display">
					{new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()}
				</div>
				<div class="screw small"></div>
			</div>
		</aside>

		<!-- Content Area -->
		<main class="content-area">
			{@render children()}
		</main>
	</div>
</div>

<!-- Mobile Layout -->
<div class="mobile-wrapper font-body">
	<header class="mobile-header">
		<div class="mobile-plate">
			<div class="screw small"></div>
			<a href="/" class="mobile-brand">quiescent</a>
			<div class="mobile-led">
				<div class="led small active"></div>
			</div>
		</div>
		<nav class="mobile-nav">
			{#each navLinks as href, i}
				<a 
					{href} 
					class="mobile-link"
					class:active={isActive(href, $page.url.pathname)}
				>
					{navNames[i]}
					<span class="stripe stripe-1"></span>
					<span class="stripe stripe-2"></span>
					<span class="stripe stripe-3"></span>
				</a>
			{/each}
		</nav>
	</header>

	<main class="mobile-main">
		{@render children()}
	</main>

	<footer class="mobile-footer">
		<div class="screw small"></div>
		<span>q - quiescent</span>
		<div class="screw small"></div>
	</footer>
</div>

<style>
	/* Desktop wrapper */
	.desktop-wrapper {
		display: none;
		padding: 1rem;
	}

	@media (min-width: 769px) {
		.desktop-wrapper {
			display: block;
		}
		.mobile-wrapper {
			display: none !important;
		}
	}

	.desktop-container {
		display: flex;
		gap: 1rem;
		max-width: 950px;
		margin: 0 auto;
	}

	/* === SCREWS === */
	.screw {
		width: 12px;
		height: 12px;
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
		top: 50%;
		left: 25%;
		right: 25%;
		height: 1.5px;
		background: var(--color-brown);
		transform: translateY(-50%) rotate(-45deg);
	}

	.screw.small {
		width: 8px;
		height: 8px;
	}

	.screw.small::before {
		height: 1px;
	}

	/* === LEDs === */
	.led {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--color-tan-dark);
		box-shadow: inset 0 1px 2px rgba(0,0,0,0.4);
	}

	.led.active {
		background: var(--color-amber);
		box-shadow: 
			inset 0 1px 2px rgba(255,255,255,0.3),
			0 0 6px var(--color-amber-glow),
			0 0 12px var(--color-amber-glow);
		animation: led-pulse 2s ease-in-out infinite;
	}

	.led.small {
		width: 6px;
		height: 6px;
	}

	@keyframes led-pulse {
		0%, 100% { box-shadow: inset 0 1px 2px rgba(255,255,255,0.3), 0 0 6px var(--color-amber-glow); }
		50% { box-shadow: inset 0 1px 2px rgba(255,255,255,0.3), 0 0 10px var(--color-amber-glow); }
	}

	/* === NAV ISLAND === */
	.nav-island {
		width: 190px;
		flex-shrink: 0;
		align-self: flex-start;
		display: flex;
		flex-direction: column;
		background: linear-gradient(180deg, var(--color-beige) 0%, var(--color-beige-dark) 100%);
		border: 2px solid var(--color-brown);
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 
			0 4px 12px rgba(0,0,0,0.3),
			inset 0 1px 0 var(--color-cream);
	}

	.deck-plate {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 6px 8px;
		background: linear-gradient(180deg, var(--color-tan) 0%, var(--color-tan-dark) 100%);
		border-bottom: 2px solid var(--color-brown);
	}

	.deck-plate.bottom {
		border-bottom: none;
		border-top: 2px solid var(--color-brown);
		margin-top: auto;
	}

	.plate-label {
		font-family: var(--font-mono);
		font-size: 0.5rem;
		font-weight: bold;
		color: var(--color-brown-dark);
		letter-spacing: 0.15em;
	}

	.nav-header {
		padding: 0.75rem;
		background: var(--color-beige);
		border-bottom: 1px solid var(--color-tan);
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.nav-brand {
		text-decoration: none;
	}

	.brand-display {
		background: var(--color-display);
		border: 2px solid var(--color-brown);
		padding: 4px 8px;
		border-radius: 3px;
		box-shadow: inset 0 2px 4px rgba(0,0,0,0.4);
	}

	.brand-title {
		font-family: var(--font-mono);
		font-size: 0.9rem;
		font-weight: bold;
		color: var(--color-display-text);
		letter-spacing: 0.1em;
		text-shadow: 0 0 8px var(--color-amber-glow);
	}

	.header-leds {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
	}

	.led-label {
		font-family: var(--font-mono);
		font-size: 0.4rem;
		color: var(--color-brown-light);
	}

	.nav-links {
		background: var(--color-beige-light);
		padding-bottom: 0.5rem;
	}

	.nav-section-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		background: var(--color-beige);
	}

	.label-text {
		font-family: var(--font-mono);
		font-size: 0.55rem;
		color: var(--color-brown-light);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		white-space: nowrap;
	}

	.label-line {
		flex: 1;
		height: 1px;
		background: var(--color-tan);
	}

	/* VU Meters */
	.vu-section {
		padding: 0.5rem 0.75rem;
		background: var(--color-beige);
		border-top: 1px solid var(--color-tan);
	}

	.vu-label {
		font-family: var(--font-mono);
		font-size: 0.45rem;
		color: var(--color-brown-light);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 4px;
	}

	.vu-meters {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.vu-meter {
		height: 6px;
		background: var(--color-display);
		border: 1px solid var(--color-brown);
		border-radius: 2px;
		overflow: hidden;
		box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
	}

	.vu-bar {
		height: 100%;
		background: linear-gradient(90deg, #4a8f4a 0%, #7ab87a 60%, #e8a040 80%, #e05030 100%);
		border-radius: 1px;
		animation: vu-bounce 1.5s ease-in-out infinite alternate;
	}

	@keyframes vu-bounce {
		0% { transform: scaleX(0.9); }
		100% { transform: scaleX(1); }
	}

	.nav-extras {
		padding: 0.5rem;
		background: var(--color-beige);
		border-top: 1px solid var(--color-tan);
		display: flex;
		justify-content: center;
	}

	/* Cassette Window */
	.cassette-window {
		padding: 0.5rem;
		background: var(--color-brown-dark);
		border-top: 2px solid var(--color-brown);
	}

	.window-frame {
		background: linear-gradient(180deg, #1a1814 0%, #2a2420 100%);
		border: 2px solid var(--color-brown);
		border-radius: 4px;
		padding: 4px;
		position: relative;
		overflow: hidden;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cassette-img {
		width: 150px;
		opacity: 0.9;
	}

	.tape-reels {
		position: absolute;
		inset: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 15px;
		pointer-events: none;
	}

	.reel {
		width: 20px;
		height: 20px;
		border: 2px solid var(--color-tan-dark);
		border-radius: 50%;
		background: radial-gradient(circle, var(--color-brown-dark) 30%, transparent 31%);
		animation: spin 3s linear infinite;
	}

	.reel.right {
		animation-direction: reverse;
	}

	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	.date-display {
		font-family: var(--font-mono);
		font-size: 0.55rem;
		color: var(--color-display-text);
		background: var(--color-display);
		padding: 2px 6px;
		border: 1px solid var(--color-brown);
		border-radius: 2px;
		letter-spacing: 0.08em;
		text-shadow: 0 0 4px var(--color-amber-glow);
	}

	/* === CONTENT AREA === */
	.content-area {
		flex: 1;
		overflow: auto;
	}

	/* === MOBILE LAYOUT === */
	.mobile-wrapper {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		gap: 0.5rem;
	}

	.mobile-header {
		background: linear-gradient(180deg, var(--color-beige) 0%, var(--color-beige-dark) 100%);
		border: 2px solid var(--color-brown);
		border-radius: 8px;
		overflow: hidden;
	}

	.mobile-plate {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 10px;
		background: linear-gradient(180deg, var(--color-tan) 0%, var(--color-tan-dark) 100%);
		border-bottom: 2px solid var(--color-brown);
	}

	.mobile-brand {
		font-family: var(--font-mono);
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--color-brown-dark);
		text-decoration: none;
		letter-spacing: 0.1em;
		transition: color 0.15s ease;
	}

	.mobile-brand:hover {
		color: var(--color-amber);
	}

	.mobile-led {
		display: flex;
		align-items: center;
	}

	.mobile-nav {
		display: flex;
		background: var(--color-beige-light);
	}

	.mobile-link {
		flex: 1;
		position: relative;
		font-family: var(--font-mono);
		font-size: 0.6rem;
		padding: 0.5rem 0.5rem;
		color: var(--color-brown);
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-align: center;
		overflow: hidden;
		isolation: isolate;
		transition: color 0.3s ease 0.05s;
		border-right: 1px solid var(--color-tan);
	}

	.mobile-link:last-child {
		border-right: none;
	}

	.stripe {
		position: absolute;
		left: -100%;
		width: 100%;
		height: 33.33%;
		z-index: -1;
		transition: left 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	.stripe-1 {
		bottom: 0;
		background: #a05030;
		transition-delay: 0s;
	}

	.stripe-2 {
		bottom: 33.33%;
		background: #d06820;
		transition-delay: 0.06s;
	}

	.stripe-3 {
		bottom: 66.66%;
		background: #e88b28;
		transition-delay: 0.12s;
	}

	.mobile-link:hover .stripe,
	.mobile-link.active .stripe {
		left: 0;
	}

	.mobile-link:hover,
	.mobile-link.active {
		color: var(--color-cream);
	}

	.mobile-main {
		flex: 1;
		overflow: auto;
	}

	.mobile-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 10px;
		background: linear-gradient(180deg, var(--color-tan) 0%, var(--color-tan-dark) 100%);
		border: 2px solid var(--color-brown);
		border-radius: 8px;
		font-family: var(--font-mono);
		font-size: 0.55rem;
		color: var(--color-brown-dark);
		letter-spacing: 0.05em;
	}
</style>
