<script lang="ts">
	import { Section } from '$lib/components/ui';
	import { Button } from '$lib/components/ui';

	let name = $state('');
	let message = $state('');

	const avatars = ['🌟', '🌈', '🦋', '🌻', '🍄', '🎵', '🌙', '🌸', '🎨'];

	const entries = $state([
		{
			name: 'Web Wanderer',
			message: 'Love the aesthetic! The music player is so cool ✨',
			date: '2026-02-23',
			avatar: '🌙'
		},
		{
			name: 'Fellow Neocitian',
			message: 'Great to see another cute personal site! Keep it up!',
			date: '2026-02-22',
			avatar: '🌸'
		},
		{
			name: 'Anonymous',
			message: 'The color palette is *chefs kiss*',
			date: '2026-02-21',
			avatar: '🎨'
		}
	]);

	function submit(e: Event) {
		e.preventDefault();
		if (!name.trim() || !message.trim()) return;

		entries.unshift({
			name: name.trim(),
			message: message.trim(),
			date: new Date().toISOString().split('T')[0],
			avatar: avatars[Math.floor(Math.random() * avatars.length)]
		});
		name = '';
		message = '';
	}
</script>

<Section title="Guestbook" icon="📖" id="guestbook">
	<!-- Form -->
	<form onsubmit={submit} class="bg-white/60 rounded-lg p-4 mb-4">
		<p class="text-olive-dark text-sm mb-3">Leave a message! I'd love to hear from you ♡</p>
		<div class="grid sm:grid-cols-2 gap-3 mb-3">
			<input
				type="text"
				bind:value={name}
				placeholder="Your name"
				class="input-field"
			/>
			<input
				type="text"
				bind:value={message}
				placeholder="Your message..."
				class="input-field"
			/>
		</div>
		<Button type="submit" size="sm">✨ Sign Guestbook</Button>
	</form>

	<!-- Entries -->
	<div class="space-y-3 max-h-80 overflow-y-auto pr-2">
		{#each entries as entry}
			<div class="bg-peach/50 rounded-lg p-4 border-l-4 border-sage">
				<div class="flex items-start gap-3">
					<div class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shrink-0">
						{entry.avatar}
					</div>
					<div class="min-w-0 flex-1">
						<div class="flex items-center justify-between gap-2">
							<span class="font-semibold text-olive truncate">{entry.name}</span>
							<span class="text-xs text-sage-dark font-mono shrink-0">{entry.date}</span>
						</div>
						<p class="text-olive-dark text-sm mt-1">{entry.message}</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</Section>

<style>
	.input-field {
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem;
		border: 2px solid var(--color-sage);
		background: white;
		color: var(--color-olive-dark);
		font-size: 0.875rem;
		outline: none;
		transition: border-color 0.2s;
	}
	.input-field:focus {
		border-color: var(--color-orange);
	}
</style>
