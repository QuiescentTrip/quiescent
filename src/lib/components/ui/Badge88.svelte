<script lang="ts">
	type Props = {
		text: string;
		href?: string;
		gradient?: string;
		textColor?: string;
	};

	let {
		text,
		href,
		gradient = 'from-olive to-olive-light',
		textColor = 'text-peach'
	}: Props = $props();

	const base = `w-[88px] h-[31px] rounded text-[9px] flex items-center justify-center font-mono hover:scale-105 transition-transform bg-gradient-to-r ${gradient} ${textColor}`;
</script>

{#if href}
	<a {href} class="block">
		<div class={base}>{text}</div>
	</a>
{:else}
	<div class={base}>{text}</div>
{/if}
