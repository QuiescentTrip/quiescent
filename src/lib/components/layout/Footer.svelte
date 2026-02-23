<script lang="ts">
	const siteAuthor = 'quiescent';
	const siteEstablished = '2026';
	const siteHosting = '';
</script>

<footer class="mt-8 retro-box rounded-lg p-6 text-center">
	<div class="flex justify-center gap-2 mb-3">
		<span class="w-4 h-4 rounded-full bg-olive"></span>
		<span class="w-4 h-4 rounded-full bg-sage"></span>
		<span class="w-4 h-4 rounded-full bg-peach"></span>
		<span class="w-4 h-4 rounded-full bg-orange"></span>
		<span class="w-4 h-4 rounded-full bg-coral"></span>
	</div>
	<p class="text-olive-dark text-sm">
		made with love by {siteAuthor.toLowerCase()} - est. {siteEstablished} -
		<a href="https://neocities.org" class="text-coral hover:underline">
			hosted on {siteHosting}
		</a>
	</p>
	<p class="text-sage-dark text-xs mt-2">best viewed on desktop - built with svelte & tailwind</p>
</footer>
