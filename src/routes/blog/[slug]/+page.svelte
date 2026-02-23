<script lang="ts">
	import { PageHeader } from '$lib/components/layout';
	import { Tag, Button } from '$lib/components/ui';
	import { MarkdownRenderer } from '$lib/components/features';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.meta.title} ✿ Fabian's Blog</title>
	<meta name="description" content={data.meta.excerpt} />
</svelte:head>

<div class="min-h-screen bg-peach font-body">
	<PageHeader backLink="/blog" backText="← back to blog" title="" />

	<main class="max-w-3xl mx-auto px-4 py-8">
		<article class="retro-box rounded-lg p-6 md:p-8">
			<!-- Header -->
			<header class="mb-6 pb-6 border-b-2 border-sage/30">
				<h1 class="font-display text-2xl md:text-4xl text-olive mb-3">{data.meta.title}</h1>
				<div class="flex flex-wrap items-center gap-3 text-sm">
					<span class="text-sage-dark font-mono">{data.meta.date}</span>
					<span class="text-sage-dark">·</span>
					{#each data.meta.tags as tag}
						<Tag {tag} />
					{/each}
				</div>
			</header>

			<!-- Content -->
			{#if data.isNotion && data.content}
				<MarkdownRenderer content={data.content} />
			{:else}
				<div
					class="prose-custom
						[&>h1]:font-display [&>h1]:text-2xl [&>h1]:text-olive [&>h1]:mt-6 [&>h1]:mb-3
						[&>h2]:font-display [&>h2]:text-xl [&>h2]:text-olive [&>h2]:mt-6 [&>h2]:mb-3
						[&>h3]:font-display [&>h3]:text-lg [&>h3]:text-olive [&>h3]:mt-5 [&>h3]:mb-2
						[&>p]:text-olive-dark [&>p]:leading-relaxed [&>p]:my-3
						[&>ul]:list-disc [&>ul]:list-inside [&>ul]:text-olive-dark [&>ul]:my-3 [&>ul]:space-y-1
						[&>ol]:list-decimal [&>ol]:list-inside [&>ol]:text-olive-dark [&>ol]:my-3 [&>ol]:space-y-1
						[&>blockquote]:border-l-4 [&>blockquote]:border-sage [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-olive-dark [&>blockquote]:my-3
						[&>pre]:bg-olive-dark [&>pre]:text-peach-light [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:my-4
						[&_code]:bg-sage/30 [&_code]:px-1 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
						[&>pre_code]:bg-transparent [&>pre_code]:p-0
						[&>hr]:my-6 [&>hr]:border-sage/50
						[&_a]:text-coral [&_a]:hover:underline
						[&_strong]:font-semibold"
				>
					<p class="text-olive-dark">{data.meta.excerpt}</p>
					<p class="text-sage-dark italic mt-4">
						This post uses local markdown. Set up Notion to enable full content rendering.
					</p>
				</div>
			{/if}

			<!-- Footer -->
			<footer
				class="mt-8 pt-6 border-t-2 border-sage/30 flex flex-col sm:flex-row items-center justify-between gap-4"
			>
				<Button href="/blog" variant="ghost">← More posts</Button>
				<Button href="/#guestbook" size="sm">Leave a comment ✨</Button>
			</footer>
		</article>

		<!-- Related Posts -->
		{#if data.relatedPosts.length > 0}
			<section class="mt-8">
				<h2 class="font-display text-xl text-olive mb-4">More posts</h2>
				<div class="grid sm:grid-cols-2 gap-4">
					{#each data.relatedPosts as post}
						<a
							href="/blog/{post.slug}"
							class="retro-box rounded-lg p-4 hover:shadow-lg transition-all group"
						>
							<h3 class="font-display text-olive group-hover:text-coral transition-colors">
								{post.title}
							</h3>
							<p class="text-olive-dark text-sm mt-1 line-clamp-2">{post.excerpt}</p>
							<span class="text-xs text-sage-dark font-mono mt-2 block">{post.date}</span>
						</a>
					{/each}
				</div>
			</section>
		{/if}
	</main>
</div>
