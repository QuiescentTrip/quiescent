<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'default' | 'interactive' | 'glass';

	type Props = {
		variant?: Variant;
		class?: string;
		children: Snippet;
	};

	let { variant = 'default', class: className = '', children }: Props = $props();

	const base = 'retro-box rounded-lg';
	
	const variants: Record<Variant, string> = {
		default: '',
		interactive: 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group',
		glass: 'bg-white/60'
	};
</script>

<div class="{base} {variants[variant]} {className}">
	{@render children()}
</div>
