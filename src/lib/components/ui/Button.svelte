<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'secondary' | 'ghost' | 'pill';
	type Size = 'sm' | 'md' | 'lg';

	type Props = {
		variant?: Variant;
		size?: Size;
		href?: string;
		children: Snippet;
	} & (HTMLButtonAttributes | HTMLAnchorAttributes);

	let { variant = 'primary', size = 'md', href, children, ...rest }: Props = $props();

	const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer';
	
	const variants: Record<Variant, string> = {
		primary: 'bg-gradient-to-r from-orange to-coral text-white hover:from-coral hover:to-orange shadow-md',
		secondary: 'bg-sage text-olive-dark hover:bg-orange hover:text-white',
		ghost: 'bg-transparent text-coral hover:text-coral-dark hover:underline',
		pill: 'bg-sage/50 text-olive-dark hover:bg-orange hover:text-white rounded-full'
	};

	const sizes: Record<Size, string> = {
		sm: 'px-3 py-1 text-xs rounded-full',
		md: 'px-4 py-2 text-sm rounded-full',
		lg: 'px-6 py-3 text-base rounded-full'
	};

	const classes = `${baseStyles} ${variants[variant]} ${sizes[size]}`;
</script>

{#if href}
	<a {href} class={classes} {...rest as HTMLAnchorAttributes}>
		{@render children()}
	</a>
{:else}
	<button class={classes} {...rest as HTMLButtonAttributes}>
		{@render children()}
	</button>
{/if}
