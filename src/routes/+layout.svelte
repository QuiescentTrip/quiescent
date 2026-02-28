<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
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

<div class="site-layout font-body">
	<!-- Unified Header -->
	<header class="unified-header">
		<a href="/" class="header-brand">
			<span class="brand-name">quiescent</span>
			<span class="brand-tagline">quiet, still, inactive</span>
		</a>
		
		<nav class="header-nav">
			{#each navLinks as href, i}
				<a 
					{href} 
					class="nav-link"
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

	<!-- Main Content -->
	<main class="site-content">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="unified-footer">
		<span>scrapped quiescent</span>
	</footer>
</div>

<style>
	.site-layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	/* Header */
	.unified-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 1rem;
		background: var(--color-brown-dark);
		border-bottom: 3px solid var(--color-tan-dark);
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.header-brand {
		display: flex;
		flex-direction: column;
		text-decoration: none;
	}

	.brand-name {
		font-family: var(--font-display);
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--color-cream);
		letter-spacing: 0.05em;
		transition: color 0.15s ease;
	}

	.header-brand:hover .brand-name {
		color: var(--color-amber);
	}

	.brand-tagline {
		font-family: var(--font-mono);
		font-size: 0.5rem;
		color: var(--color-tan);
		letter-spacing: 0.05em;
	}

	/* Navigation */
	.header-nav {
		display: flex;
		gap: 2px;
	}

	.nav-link {
		position: relative;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		padding: 0.5rem 0.75rem;
		color: var(--color-tan);
		text-decoration: none;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		overflow: hidden;
		isolation: isolate;
		transition: color 0.3s ease 0.05s;
	}

	/* Animated stripes */
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

	.nav-link:hover .stripe,
	.nav-link.active .stripe {
		left: 0;
	}

	.nav-link:hover,
	.nav-link.active {
		color: var(--color-cream);
	}

	/* Content */
	.site-content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	/* Footer */
	.unified-footer {
		padding: 0.75rem 1rem;
		background: var(--color-brown-dark);
		border-top: 2px solid var(--color-tan-dark);
		text-align: center;
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: var(--color-tan);
		letter-spacing: 0.05em;
	}

	/* Mobile adjustments */
	@media (max-width: 480px) {
		.unified-header {
			padding: 0.5rem 0.75rem;
		}

		.brand-name {
			font-size: 1rem;
		}

		.nav-link {
			font-size: 0.6rem;
			padding: 0.4rem 0.5rem;
		}
	}
</style>
