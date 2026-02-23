<script lang="ts">
	import { site, now, updates } from '$lib/config';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const navLinks = [
		{ name: 'home', href: '/' },
		{ name: 'blog', href: '/blog' },
		{ name: 'music', href: '/music' },
		{ name: 'about', href: '#about' },
		{ name: 'links', href: '#links' }
	];

	const webrings = [
		{ name: 'Indie Web', prev: '#', next: '#' },
		{ name: 'Personal Sites', prev: '#', next: '#' }
	];

	const badges = [
		'https://cyber.dabamos.de/88x31/neocities.gif',
		'https://cyber.dabamos.de/88x31/www.gif',
		'https://cyber.dabamos.de/88x31/notepad.gif',
		'https://cyber.dabamos.de/88x31/nocookie.gif',
		'./images/buttons/blankbanshee.gif'
	];

	const links = [
		{ name: 'Neocities', url: 'https://neocities.org' }
	];
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<div class="site-container font-body">
	<!-- Header -->
	<header class="site-header">
		<div>
			<h1>{site.name}</h1>
			<p class="tagline">{site.tagline}</p>
		</div>
		<div class="display-panel">
			{new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()}
		</div>
	</header>

	<!-- Navigation -->
	<nav class="site-nav">
		<div class="nav-title">navigate</div>
		{#each navLinks as link}
			<a href={link.href}>
				{link.name}
				<span class="nav-stripe-1"></span>
				<span class="nav-stripe-2"></span>
				<span class="nav-stripe-3"></span>
			</a>
		{/each}

		<div class="nav-title">elsewhere</div>
		{#each links.slice(0, 3) as link}
			<a href={link.url} target="_blank">
				{link.name}
				<span class="nav-stripe-1"></span>
				<span class="nav-stripe-2"></span>
				<span class="nav-stripe-3"></span>
			</a>
		{/each}

		<div class="status-row">
			<span class="status-dot active"></span>
			<span>online</span>
		</div>
	</nav>

	<!-- Main -->
	<main class="site-main">
		<!-- Welcome -->
		<section class="section full">
			<h2>welcome</h2>
			<div class="section-content">
				<p>
					this is my personal website. i make music, write things, and collect links 
					to interesting corners of the web.
				</p>
				<p>
					no tracking, no ads. just html.
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
				<div class="lastfm-widget">
					<iframe 
						src="https://petracoding.github.io/neocities/widgets/lastfm?center=0&marquee=0&font-family=Consolas&font-size=12px&color=%234a4238&username=quiescenttrip&swapPositions=0&delimiter=by&underline=0" 
						frameborder="0" 
						title="Last.Fm Status"
					></iframe>
				</div>
				<div class="status-item">
					<span class="label">reading:</span>
					<span class="value">{now.reading}</span>
				</div>
				<div class="status-item">
					<span class="label">playing:</span>
					<span class="value">{now.playing}</span>
				</div>
				<div class="status-item">
					<span class="label">mood:</span>
					<span class="value">{now.mood}</span>
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
					i like making things and putting them online. this site is hand-coded.
				</p>
				<h3>interests</h3>
				<ul>
					<li>music production</li>
					<li>web development</li>
					<li>video games</li>
				</ul>
			</div>
		</section>

		<!-- Links -->
		<section class="section half" id="links">
			<h2>links</h2>
			<div class="section-content">
				<h3>cool sites</h3>
				{#each links as link}
					<div class="entry">
						<a href={link.url} target="_blank">{link.name}</a>
					</div>
				{/each}
				<h3>find me</h3>
				{#each Object.entries(site.socials) as [name, url]}
					<a href={url} class="block py-0.5 text-sm">{name}</a>
				{/each}
			</div>
		</section>

		<!-- Webrings -->
		<section class="section full">
			<h2>webrings</h2>
			<div class="section-content">
				<div class="flex flex-wrap gap-2">
					{#each webrings as ring}
						<div class="webring">
							<a href={ring.prev}>←</a>
							<span class="name">{ring.name}</span>
							<a href={ring.next}>→</a>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Badges -->
		<section class="section full">
			<h2>badges</h2>
			<div class="section-content">
				<div class="badge-grid">
					{#each badges as badge}
						<img src={badge} alt="badge" class="badge-88x31" />
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
		<span>made by {site.author}</span>
		<span>·</span>
		<span>est. {site.established}</span>
		<span>·</span>
		<a href="https://neocities.org">{site.hosting}</a>
	</footer>
</div>
