<script lang="ts">
	import type { PageData } from './$types';
	import FancyButton from '$lib/components/ui/fancyButton.svelte';
    import { updates } from '$lib/data/siteUpdates';
	let { data }: { data: PageData } = $props();

	const navLinks = ['/', '/blog', '/music', '/games', '#about', '#links'];
	const navNames = ['home', 'blog', 'music', 'games', 'about', 'links'];



	const badges = [
		'./images/buttons/blankbanshee.gif',
	];
</script>

<svelte:head>
	<title>quiescent</title>
	<meta name="description" content="Q" />
</svelte:head>

<div class="site-container font-body">
	<!-- Header -->
	<header class="site-header">
		<div>
			<h1>quiescent</h1>
			<p class="tagline">adjective -- quiet, still, or inactive</p>
		</div>
		<div class="display-panel">
			{new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()}
		</div>
	</header>

	<!-- Navigation -->
	<nav class="site-nav">
		<div class="nav-title">navigate</div>
		{#each navLinks as href, i}
			<FancyButton href={href} text={navNames[i]} />
		{/each}

		<div class="status-row !flex-row !items-center gap-4 md:!flex-col md:!items-start md:gap-2">
			<iframe title="neocity ad" width="155" height="155" style="border:none" src="https://dimden.neocities.org/navlink/" name="neolink"></iframe>
			<div class="h-40 md:h-80 md:w-36 flex items-center justify-center overflow-visible">
				<img alt="cassette tape" class="h-40 md:w-80 md:pb-1 md:scale-200 md:h-auto md:rotate-90" src="./images/gif/cassette tape GIF.gif">
			</div>
		</div>
	</nav>

	<!-- Main -->
	<main class="site-main">
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
			<h2>about</h2>
			<div class="section-content">
				<p>
				i like videogames
				</p>
			</div>
		</section>

		<!-- Links -->
		<section class="section half" id="links">
			<h2>links</h2>
			<div class="section-content">
				<h3>cool sites</h3>
				<div class="entry">
					<a href="https://filliplampe.com" target="_blank">mah best friends site!</a>
				</div>
				<h3>find me</h3>
				<a href="https://github.com/QuiescentTrip" class="block py-0.5 text-sm">github</a>
			</div>
		</section>

		<!-- Webrings -->
		<section class="section full">
			<h2>webrings</h2>
			<div class="section-content">
				<div class="webring-container">
					<div class="webring-card">
						<div class="webring-header">
							<span class="webring-indicator"></span>
							<span class="webring-title">kikis broadcast network</span>
						</div>
						<div class="webring-nav">
							<a href="https://webri.ng/webring/kiki/previous?via=https%3A%2F%2Fwww.quiescent.net%2F" class="webring-btn">← prev</a>
							<a href="https://webri.ng/webring/kiki/random?via=https%3A%2F%2Fwww.quiescent.net%2F" class="webring-btn">random</a>
							<a href="https://webri.ng/webring/kiki/next?via=https%3A%2F%2Fwww.quiescent.net%2F" class="webring-btn">next →</a>
						</div>
					</div>
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
			<div class="section-content">
				<p>leave a message if you stopped by.</p>
				<p class="text-sm text-brown-light mt-2">(coming soon)</p>
			</div>
		</section>
	</main>

	<!-- Footer -->
	<footer class="site-footer">
		<span>scrapped quiescent</span>
	</footer>
</div>
