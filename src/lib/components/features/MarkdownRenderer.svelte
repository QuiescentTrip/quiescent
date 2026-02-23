<script lang="ts">
	type Props = {
		content: string;
	};

	let { content }: Props = $props();

	function parseMarkdown(md: string): string {
		return md
			.replace(/^### (.+)$/gm, '<h3 class="font-display text-lg text-olive mt-5 mb-2">$1</h3>')
			.replace(/^## (.+)$/gm, '<h2 class="font-display text-xl text-olive mt-6 mb-3">$1</h2>')
			.replace(/^# (.+)$/gm, '<h1 class="font-display text-2xl text-olive mt-6 mb-3">$1</h1>')
			.replace(/^---$/gm, '<hr class="my-6 border-sage/50" />')
			.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
			.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
			.replace(/\*(.+?)\*/g, '<em>$1</em>')
			.replace(/`([^`]+)`/g, '<code class="bg-sage/30 px-1 rounded text-sm font-mono">$1</code>')
			.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-coral hover:underline">$1</a>')
			.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-sage pl-4 italic text-olive-dark my-3">$1</blockquote>')
			.replace(/^- (.+)$/gm, '<li class="ml-4 text-olive-dark">• $1</li>')
			.split('\n\n')
			.map((block) => {
				block = block.trim();
				if (!block) return '';
				if (block.startsWith('<')) return block;
				return `<p class="text-olive-dark leading-relaxed my-3">${block.replace(/\n/g, '<br>')}</p>`;
			})
			.join('\n');
	}

	const html = $derived(parseMarkdown(content));
</script>

<div class="prose-custom">
	{@html html}
</div>
