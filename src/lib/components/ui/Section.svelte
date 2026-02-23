<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title?: string;
		icon?: string;
		id?: string;
		action?: Snippet;
		children: Snippet;
	};

	let { title, icon, id, action, children }: Props = $props();
</script>

<section {id} class="retro-box rounded-lg p-6">
	{#if title}
		<div class="flex items-center justify-between mb-4">
			<h2 class="font-display text-2xl text-olive flex items-center gap-2">
				{#if icon}<span class="text-3xl">{icon}</span>{/if}
				{title}
			</h2>
			{#if action}
				{@render action()}
			{/if}
		</div>
	{/if}
	{@render children()}
</section>
