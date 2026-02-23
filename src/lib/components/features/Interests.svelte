<script lang="ts">
	type Props = {
		items?: string[];
	};

	let {
		items = [
			'♫ Music production & discovery',
			'💻 Web development',
			'🎮 Video games',
			'📚 Reading & writing',
			'☕ Coffee & cozy vibes'
		]
	}: Props = $props();
</script>

<div class="bg-white/60 rounded-lg p-4">
	<h3 class="font-semibold text-olive mb-2">✦ Interests</h3>
	<ul class="text-olive-dark text-sm space-y-1">
		{#each items as item}
			<li>{item}</li>
		{/each}
	</ul>
</div>
