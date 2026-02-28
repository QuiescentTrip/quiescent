import { readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { error } from '@sveltejs/kit';
import type { Game } from '$lib/data/games';

const GAMES_DIR = 'static/games';
const LABEL_NAMES = ['label.png', 'label.gif', 'label.jpg', 'cover.png', 'cover.gif', 'cover.jpg'];
const IMAGE_EXTENSIONS = ['.png', '.gif', '.jpg', '.jpeg', '.p8.png'];

export const prerender = true;

export async function load({ params }): Promise<Game> {
	const gameFolderPath = join(GAMES_DIR, params.slug);

	if (!existsSync(gameFolderPath)) {
		throw error(404, 'Game not found');
	}

	const files = await readdir(gameFolderPath);
	const htmlFile = files.find((f) => f.endsWith('.html'));

	if (!htmlFile) {
		throw error(404, 'Game HTML file not found');
	}

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

	return {
		slug: params.slug,
		name: params.slug
			.replace(/-/g, ' ')
			.replace(/_/g, ' ')
			.replace(/\b\w/g, (c) => c.toUpperCase()),
		htmlFile,
		label
	};
}
