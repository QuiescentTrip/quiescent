<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const navLinks = ['/', '/blog', '/music', '#about', '#links'];
	const navNames = ['home', 'blog', 'music', 'about', 'links'];

	const updates = [
		{ date: '02/23', text: 'added music player' },
		{ date: '02/22', text: 'first commit of website' }
	];

	const webrings = [];

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
			<a {href}>
				{navNames[i]}
				<span class="nav-stripe-1"></span>
				<span class="nav-stripe-2"></span>
				<span class="nav-stripe-3"></span>
			</a>
		{/each}

		<div class="nav-title">elsewhere</div>
		<a href="https://neocities.org" target="_blank">
			Neocities
			<span class="nav-stripe-1"></span>
			<span class="nav-stripe-2"></span>
			<span class="nav-stripe-3"></span>
		</a>

		<div class="status-row">
			<span class="status-dot active"></span>
			<span>online</span>
		</div>
		<div class="status-row">
			<iframe title="neocity ad" width="155" height="155" style="border:none" src="https://dimden.neocities.org/navlink/" name="neolink"></iframe>
		</div>
		<div class="status-row h-80">
			<img class="rotate-90 scale-200" src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDJpY2p6enBvcWlibnBoMXJxZmcweWJpOGxwZXM0MzhkZ3ZyZTVvOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13CpJR7THZgaaY/giphy.gif">
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
					<a href="https://neocities.org" target="_blank">Neocities</a>
				</div>
				<h3>find me</h3>
				<a href="https://github.com/QuiescentTrip" class="block py-0.5 text-sm">github</a>
			</div>
		</section>

		<!-- Webrings -->
		<section class="section full">
			<h2>webrings</h2>
			<div class="section-content">
				<div class="flex flex-wrap gap-2">
					{#if webrings.length > 0}
						{#each webrings as [name, prev, next]}
							<div class="webring">
								<a href={prev}>←</a>
								<span class="name">{name}</span>
								<a href={next}>→</a>
							</div>
						{/each}
					{:else}
						<span>none yet</span>
					{/if}
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
		<span>made by quiescent</span>
		<span>·</span>
		<span>est. 2026</span>
	</footer>
</div>
