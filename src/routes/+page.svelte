<script lang="ts">
	import { Header, Footer, Sidebar } from '$lib/components/layout';
	import { Section } from '$lib/components/ui';
	import {
		MusicPlayer,
		NowPlaying,
		UpdatesFeed,
		SocialLinks,
		CurrentStatus,
		Interests,
		Guestbook,
		Webrings,
		BlogPreview,
		Badges
	} from '$lib/components/features';
	import { site } from '$lib/config';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<div class="min-h-screen bg-peach font-body">
	<div class="max-w-5xl mx-auto px-4 py-6">
		<Header />

		<div class="grid lg:grid-cols-3 gap-6">
			<!-- Main Content -->
			<div class="lg:col-span-2 space-y-6">
				<!-- Welcome -->
				<Section>
					<div class="flex flex-col md:flex-row items-center gap-6">
						<div
							class="w-32 h-32 rounded-full bg-gradient-to-br from-orange to-coral flex items-center justify-center text-white text-5xl font-display shadow-lg"
						>
							FT
						</div>
						<div class="text-center md:text-left">
							<h2 class="font-display text-2xl text-olive mb-2">Welcome!</h2>
							<p class="text-olive-dark leading-relaxed">
								Hey there! I'm <strong>{site.author}</strong>. This is my little corner of the
								internet where I share my music, thoughts, and things I love. Make yourself at
								home!
							</p>
						</div>
					</div>
				</Section>

				<!-- Music -->
				<Section title="My Music" icon="🎵" id="music">
					<MusicPlayer />
				</Section>

				<!-- Blog -->
				{#snippet blogAction()}
					<a href="/blog" class="text-coral hover:text-coral-dark text-sm font-semibold">
						view all →
					</a>
				{/snippet}
				<Section title="Latest Posts" icon="📝" action={blogAction}>
					<BlogPreview posts={data.recentPosts} />
				</Section>

				<!-- About -->
				<Section title="About Me" icon="🎨" id="about">
					<div class="grid md:grid-cols-2 gap-4">
						<Interests />
						<CurrentStatus />
					</div>
				</Section>

				<!-- Guestbook -->
				<Guestbook />
			</div>

			<!-- Sidebar -->
			<Sidebar>
				<UpdatesFeed />
				<NowPlaying />
				<SocialLinks />
				<Badges />
				<Webrings />
			</Sidebar>
		</div>

		<Footer />
	</div>
</div>
