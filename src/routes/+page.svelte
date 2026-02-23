<script lang="ts">
	import { site, now, updates } from '$lib/config';
	import { MusicPlayer } from '$lib/components/features';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const navLinks = [
		{ name: 'home', href: '/' },
		{ name: 'blog', href: '/blog' },
		{ name: 'music', href: '#music' },
		{ name: 'about', href: '#about' },
		{ name: 'guestbook', href: '#guestbook' },
		{ name: 'links', href: '#links' }
	];
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<div class="site-container font-body">
	<!-- Header -->
	<header class="site-header">
		<div class="accent-bar mb-3"></div>
		<h1>{site.name}</h1>
		<p class="tagline">{site.tagline}</p>
	</header>

	<!-- Navigation -->
	<nav class="site-nav">
		<div class="nav-title">navigation</div>
		{#each navLinks as link}
			<a href={link.href}>{link.name}</a>
		{/each}

		<div class="nav-title mt-4">status</div>
		<div class="text-xs text-olive-dark px-2 py-1">
			<span class="now-indicator"></span>
			<span class="ml-1">online</span>
		</div>

		<div class="mt-4 flex flex-wrap gap-1 px-1">
			<img 
				src="https://cyber.dabamos.de/88x31/neocities.gif" 
				alt="neocities" 
				class="badge-88x31"
			/>
			<img 
				src="https://cyber.dabamos.de/88x31/www.gif" 
				alt="www" 
				class="badge-88x31"
			/>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="site-main">
		<!-- Welcome -->
		<section class="section full">
			<h2>welcome</h2>
			<p>
				hey. i'm <strong class="text-coral">{site.author}</strong>. this is my personal website—
				a quiet spot away from algorithms and feeds. i make music, write things, 
				and collect interesting corners of the web.
			</p>
			<p>
				no tracking. no ads. just a website, the way they used to be.
			</p>
		</section>

		<!-- Updates -->
		<section class="section half">
			<h2>updates</h2>
			{#each updates.slice(0, 5) as update}
				<div class="update-entry">
					<span class="date">{update.date}</span>
					<span class="text">{update.text}</span>
				</div>
			{/each}
		</section>

		<!-- Currently -->
		<section class="section half">
			<h2>currently</h2>
			<div class="status-item">
				<span class="label">listening:</span>
				<span class="value">{now.listening}</span>
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
		</section>

		<!-- Music -->
		<section class="section full" id="music">
			<h2>music</h2>
			<p class="mb-3">i make electronic music sometimes. here's some of it:</p>
			<MusicPlayer />
		</section>

		<!-- Blog -->
		<section class="section full">
			<h2>latest posts</h2>
			{#if data.recentPosts && data.recentPosts.length > 0}
				<div class="space-y-2">
					{#each data.recentPosts.slice(0, 3) as post}
						<div class="flex gap-3 items-baseline">
							<span class="text-sage-dark font-mono text-xs shrink-0">
								{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
							</span>
							<a href="/blog/{post.slug}" class="text-sm hover:text-coral">
								{post.title}
							</a>
						</div>
					{/each}
				</div>
				<a href="/blog" class="inline-block mt-3 text-xs text-sage-dark hover:text-coral">
					→ view all posts
				</a>
			{:else}
				<p class="text-sage-dark text-sm italic">no posts yet. check back soon.</p>
			{/if}
		</section>

		<!-- About -->
		<section class="section half" id="about">
			<h2>about</h2>
			<p>
				just someone who likes making things and putting them on the internet.
				this site is hand-coded—no templates, no page builders.
			</p>
			<h3>interests</h3>
			<ul>
				<li>music production</li>
				<li>web development</li>
				<li>video games</li>
				<li>reading</li>
			</ul>
		</section>

		<!-- Why a Website -->
		<section class="section half">
			<h2>why make a website?</h2>
			<p>
				because social media is rented land. because algorithms optimize for 
				engagement, not meaning. because i wanted a place that's <em>mine</em>.
			</p>
			<p class="text-xs text-sage-dark mt-2">
				inspired by the indie web and everyone who refuses to let the internet become a mall.
			</p>
		</section>

		<!-- Guestbook -->
		<section class="section full" id="guestbook">
			<h2>guestbook</h2>
			<p>
				say hi! leave a message if you stopped by.
			</p>
			<p class="text-xs text-sage-dark mt-2 italic">
				(guestbook coming soon)
			</p>
		</section>

		<!-- Links -->
		<section class="section half" id="links">
			<h2>find me</h2>
			<div class="space-y-1">
				{#each Object.entries(site.socials) as [name, url]}
					<a 
						href={url} 
						class="block text-sm py-1 border-l-2 border-transparent pl-2 hover:border-coral hover:bg-peach transition-all"
					>
						{name}
					</a>
				{/each}
			</div>
		</section>

		<!-- Webrings -->
		<section class="section half">
			<h2>webrings</h2>
			<p class="text-sm text-sage-dark">
				part of the indie web community.
			</p>
			<div class="mt-2 text-xs text-sage-dark">
				← prev | <span class="text-coral">webring name</span> | next →
			</div>
		</section>
	</main>

	<!-- Footer -->
	<footer class="site-footer">
		<div class="accent-bar mb-3"></div>
		<p>
			made with care by {site.author} · est. {site.established} · 
			<a href="https://neocities.org">hosted on {site.hosting}</a>
		</p>
		<p class="mt-1">
			best viewed with curiosity
		</p>
	</footer>
</div>
