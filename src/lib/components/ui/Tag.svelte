<script lang="ts">
	type Props = {
		tag: string;
		href?: string;
		size?: 'sm' | 'md';
	};

	let { tag, href, size = 'sm' }: Props = $props();

	const colors: Record<string, string> = {
		update: 'bg-orange/20 text-orange-dark',
		personal: 'bg-sage/40 text-olive-dark',
		music: 'bg-coral/20 text-coral-dark',
		recommendations: 'bg-peach-dark/30 text-olive',
		coding: 'bg-olive/20 text-olive-dark',
		learning: 'bg-sage-dark/30 text-olive',
		web: 'bg-coral/30 text-coral-dark'
	};

	const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';
	const colorClass = colors[tag] || 'bg-sage/30 text-olive-dark';
</script>

{#if href}
	<a
		{href}
		class="rounded-full {sizeClasses} {colorClass} hover:scale-105 transition-transform inline-block"
	>
		#{tag}
	</a>
{:else}
	<span class="rounded-full {sizeClasses} {colorClass} inline-block">
		#{tag}
	</span>
{/if}
