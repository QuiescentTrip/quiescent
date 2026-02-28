<script lang="ts">
	import type { PageData } from './$types';
	import { updates } from '$lib/data/siteUpdates';
	let { data }: { data: PageData } = $props();

	const badges = [
		'./images/buttons/blankbanshee.gif',
	];
</script>

<svelte:head>
	<title>quiescent</title>
	<meta name="description" content="Q" />
</svelte:head>

<div class="home-page">
	<div class="home-container">
		<!-- Welcome -->
		<section class="section full">
			<h2>welcome</h2>
			<div class="section-content">
				<p>
					i am <b>quiescent</b>, a software engineer and cybersec student
				</p>
			</div>
		</section>

		<!-- Updates -->
		<section class="section half">
			<h2>updates</h2>
			<div class="section-content">
				{#each updates as update}
					<div class="entry">
						<span class="date">{update.date}</span>
						<span class="text">{update.text}</span>
					</div>
				{/each}
			</div>
		</section>

		<!-- Currently -->
		<section class="section half">
			<h2>currently</h2>
			<div class="section-content">
				<div class="status-item">
					<span class="label">listening:</span>
				</div>
				<div class="lastfm-widget" style="overflow:hidden; max-width:100%; height:1.6em; min-height:0; display:flex; align-items:center; padding:0;">
					<iframe 
						src="https://petracoding.github.io/neocities/widgets/lastfm?center=0&marquee=0&font-family=Consolas&font-size=12px&color=%234a4238&username=quiescenttrip&swapPositions=0&delimiter=by&underline=0" 
						frameborder="0" 
						title="Last.Fm Status"
						style="width:100%; min-width:0; border:none; height:100%; display:block; padding:0; margin:0;"
						scrolling="no"
					></iframe>
				</div>
				<div class="status-item">
					<span class="label">reading:</span>
					<span class="value">mythos</span>
				</div>
				<div class="status-item">
					<span class="label">playing:</span>
					<span class="value">witcher 3</span>
				</div>
				<div class="status-item">
					<span class="label">mood:</span>
					<span class="value">hmm</span>
				</div>
			</div>
		</section>

		<div class="section full">
			<img src="./images/gif/eye.gif" alt="eye" class="w-full h-full object-cover [image-rendering:pixelated]">
		</div>

		<!-- Blog -->
		<section class="section full">
			<h2>recent posts</h2>
			<div class="section-content">
				{#if data.recentPosts && data.recentPosts.length > 0}
					{#each data.recentPosts.slice(0, 3) as post}
						<div class="entry">
							<span class="date">{new Date(post.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}</span>
							<a href="/blog/{post.slug}">{post.title}</a>
						</div>
					{/each}
					<a href="/blog" class="btn mt-3 inline-block">all posts →</a>
				{:else}
					<p>nothing here yet.</p>
				{/if}
			</div>
		</section>

		<!-- About -->
		<section class="section half" id="about">
			<h2>about me</h2>
			<div class="section-content">
			<img src="./images/gif/cateatingwire.gif" alt="cat eating wire" class="w-full h-full object-cover [image-rendering:pixelated]">
			</div>
		</section>

		<!-- Webrings -->
		<section class="section half">
			<h2>webrings</h2>
			<div class="section-content webring-content">
				<p class="webring-title">✧ kiki's Broadcast webring ✧</p>
				<a href="https://webri.ng/webring/kiki/random?via=https%3A%2F%2Fwww.quiescent.net%2F" class="webring-badge">
					<img src="./images/buttons/kiki.png" alt="kiki's broadcast network" />
				</a>
				<div class="webring-arrows">
					<a href="https://webri.ng/webring/kiki/previous?via=https%3A%2F%2Fwww.quiescent.net%2F">← prev</a>
					<span class="dot">♡</span>
					<a href="https://webri.ng/webring/kiki/next?via=https%3A%2F%2Fwww.quiescent.net%2F">next →</a>
				</div>
			</div>
		</section>

		<!-- Badges -->
		<section class="section full">
			<h2>badges</h2>
			<div class="section-content">
				<div class="badge-grid">
					{#each badges as src}
						<img {src} alt="badge" class="badge-88x31" />
					{/each}
				</div>
			</div>
		</section>

		<!-- Guestbook -->
		<section class="section full" id="guestbook">
			<h2>guestbook</h2>
			<div class="section-content guestbook-content">
				<iframe 
					src="https://quiescent.atabook.org/" 
					title="guestbook"
					class="guestbook-frame"
					loading="lazy"
				></iframe>
			</div>
		</section>
	</div>
</div>

<style>
	.home-page {
		min-height: 100%;
		padding: 1rem;
	}

	.home-container {
		max-width: 700px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	@media (max-width: 600px) {
		.home-page {
			padding: 0.75rem;
		}

		.home-container {
			grid-template-columns: 1fr;
			gap: 0.75rem;
		}
	}

	.webring-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.webring-title {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-rust);
		letter-spacing: 0.03em;
	}

	.webring-badge {
		display: block;
		padding: 4px;
		background: linear-gradient(135deg, var(--color-cream) 0%, var(--color-beige-light) 100%);
		border: 2px solid var(--color-rust);
		border-radius: 6px;
		box-shadow: 0 3px 8px rgba(0,0,0,0.12);
		transition: all 0.2s ease;
	}

	.webring-badge:hover {
		transform: translateY(-2px) scale(1.02);
		border-color: var(--color-amber);
		box-shadow: 0 5px 12px rgba(232, 139, 40, 0.25);
	}

	.webring-badge img {
		display: block;
		height: 187px;
		width: auto;
		image-rendering: pixelated;
	}

	.webring-arrows {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.7rem;
	}

	.webring-arrows a {
		color: var(--color-brown);
		text-decoration: none;
		transition: color 0.15s ease;
	}

	.webring-arrows a:hover {
		color: var(--color-amber);
	}

	.webring-arrows .dot {
		color: var(--color-rust);
		font-size: 0.6rem;
	}

	.guestbook-content {
		padding: 0 !important;
	}

	.guestbook-frame {
		width: 100%;
		height: 600px;
		border: none;
		display: block;
	}
</style>
