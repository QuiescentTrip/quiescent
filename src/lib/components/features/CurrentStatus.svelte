<script lang="ts">
	const now = {
		listening: 'ambient playlists',
		reading: 'too many browser tabs',
		playing: 'nothing rn',
		mood: 'quiet'
	};
</script>

<div class="bg-white/60 rounded-lg p-4">
	<h3 class="font-semibold text-olive mb-2">* Currently</h3>
	<ul class="text-olive-dark text-sm space-y-1">
		<li>Listening: <em>{now.listening}</em></li>
		<li>Reading: <em>{now.reading}</em></li>
		<li>Playing: <em>{now.playing}</em></li>
		<li>Mood: {now.mood}</li>
	</ul>
</div>