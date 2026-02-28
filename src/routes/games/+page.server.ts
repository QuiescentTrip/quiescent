import { readdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export type Game = {
	slug: string;
	name: string;
	htmlFile: string;
	label: string | null;
};

const LABEL_NAMES = ['label.png', 'label.gif', 'label.jpg', 'cover.png', 'cover.gif', 'cover.jpg'];
const IMAGE_EXTENSIONS = ['.png', '.gif', '.jpg', '.jpeg', '.p8.png'];

export async function load() {
	const gamesPath = path.resolve('static/games');
	const games: Game[] = [];

	if (!existsSync(gamesPath)) {
		return { games };
	}

	const entries = await readdir(gamesPath, { withFileTypes: true });

	for (const entry of entries) {
		if (entry.isDirectory()) {
			const gameFolderPath = path.join(gamesPath, entry.name);
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

	return { games };
}
