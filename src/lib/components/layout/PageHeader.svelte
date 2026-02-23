<script lang="ts">
	type Props = {
		title: string;
		subtitle?: string;
		backLink?: string;
		backText?: string;
	};

	let { title, subtitle, backLink, backText = '← back home' }: Props = $props();
</script>

<header class="bg-olive text-peach-light py-6 px-4">
	<div class="max-w-4xl mx-auto">
		{#if backLink}
			<a href={backLink} class="text-peach-dark hover:text-white text-sm mb-2 inline-block">
				{backText}
			</a>
		{/if}
		<h1 class="font-display text-4xl">{title}</h1>
		{#if subtitle}
			<p class="text-peach-dark mt-1">{subtitle}</p>
		{/if}
	</div>
</header>
