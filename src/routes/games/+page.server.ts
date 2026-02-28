import { readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import type { Game } from '$lib/data/games';

const GAMES_DIR = 'static/games';
const LABEL_NAMES = ['label.png', 'label.gif', 'label.jpg', 'cover.png', 'cover.gif', 'cover.jpg'];
const IMAGE_EXTENSIONS = ['.png', '.gif', '.jpg', '.jpeg', '.p8.png'];

export const prerender = true;

export async function load(): Promise<{ games: Game[] }> {
	try {
		if (!existsSync(GAMES_DIR)) {
			return { games: [] };
		}

		const entries = await readdir(GAMES_DIR, { withFileTypes: true });
		const games: Game[] = [];

		for (const entry of entries) {
			if (entry.isDirectory()) {
				const gameFolderPath = join(GAMES_DIR, entry.name);
				const files = await readdir(gameFolderPath);
				const htmlFile = files.find((f) => f.endsWith('.html'));

				if (htmlFile) {
					let label: string | null = null;

					for (const labelName of LABEL_NAMES) {
						if (files.includes(labelName)) {
							label = labelName;
							break;
						}
					}

					if (!label) {
						const imageFile = files.find(
							(f) =>
								IMAGE_EXTENSIONS.some((ext) => f.toLowerCase().endsWith(ext)) &&
								!f.endsWith('.html')
						);
						if (imageFile) {
							label = imageFile;
						}
					}

					games.push({
						slug: entry.name,
						name: entry.name
							.replace(/-/g, ' ')
							.replace(/_/g, ' ')
							.replace(/\b\w/g, (c) => c.toUpperCase()),
						htmlFile,
						label
					});
				}
			}
		}

		games.sort((a, b) => a.name.localeCompare(b.name));
		return { games };
	} catch (error) {
		console.error('Error reading games directory:', error);
		return { games: [] };
	}
}
