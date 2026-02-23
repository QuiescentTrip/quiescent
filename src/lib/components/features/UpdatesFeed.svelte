<script lang="ts">
	const updates = [
		{ date: '02/23', text: 'redesigned the whole site' },
		{ date: '02/22', text: 'added music player' },
		{ date: '02/21', text: 'started building' }
	];
</script>

<div class="retro-box rounded-lg p-4">
	<h3 class="font-display text-lg text-olive mb-3 flex items-center gap-2">
		<span>📢</span> Updates
	</h3>
	<div class="space-y-2 text-sm">
		{#each updates as update}
			<div class="flex gap-2 text-olive-dark">
				<span class="font-mono text-xs text-sage-dark shrink-0">{update.date}</span>
				<span>{update.text}</span>
			</div>
		{/each}
	</div>
</div>
