<script lang="ts">
	import { webrings } from '$lib/config';
	import { Badge88 } from '$lib/components/ui';
</script>

<div class="retro-box rounded-lg p-4">
	<h3 class="font-display text-lg text-olive mb-3 flex items-center gap-2">
		<span>🔗</span> Webrings
	</h3>

	<div class="space-y-3">
		{#each webrings as ring}
			<div class="bg-white/60 rounded-lg p-3 text-center">
				<p class="text-olive-dark text-sm font-semibold mb-2">{ring.name}</p>
				<div class="flex items-center justify-center gap-2 text-xs">
					<a href={ring.prev} class="webring-link">← prev</a>
					<a href={ring.home} class="webring-link home">home</a>
					<a href={ring.next} class="webring-link">next →</a>
				</div>
			</div>
		{/each}
	</div>

	<!-- Button Wall -->
	<div class="mt-4 pt-3 border-t border-sage/50">
		<p class="text-xs text-sage-dark mb-2 text-center">button wall</p>
		<div class="flex flex-wrap gap-1 justify-center">
			<Badge88 text="fabian.neo" />
			<Badge88 text="neocities" href="https://neocities.org" gradient="from-coral to-orange" textColor="text-white" />
			<Badge88 text="indie web" gradient="from-sage-dark to-sage" textColor="text-olive-dark" />
		</div>
	</div>
</div>

<style>
	.webring-link {
		padding: 0.25rem 0.5rem;
		background: rgba(var(--color-sage), 0.5);
		border-radius: 0.25rem;
		transition: all 0.2s;
	}
	.webring-link:hover {
		background: var(--color-orange);
		color: white;
	}
	.webring-link.home {
		background: rgba(var(--color-olive), 0.2);
	}
	.webring-link.home:hover {
		background: var(--color-olive);
		color: var(--color-peach);
	}
</style>
