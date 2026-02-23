<script lang="ts">
	import { Badge88 } from '$lib/components/ui';
</script>

<div class="retro-box rounded-lg p-4">
	<h3 class="font-display text-lg text-olive mb-3 flex items-center gap-2">
		<span>🏷️</span> Badges
	</h3>
	<div class="flex flex-wrap gap-2 justify-center">
		<Badge88 text="made with ♥" gradient="from-olive-dark to-olive-dark" />
		<Badge88 text="neocities" gradient="from-coral to-orange" textColor="text-white" />
		<Badge88 text="svelte 5" gradient="from-sage-dark to-sage-dark" textColor="text-white" />
	</div>
</div>
