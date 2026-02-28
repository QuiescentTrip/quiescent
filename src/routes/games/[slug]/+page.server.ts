import { readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { error } from '@sveltejs/kit';
import path from 'path';

export async function load({ params }) {
	const gamesPath = path.resolve('static/games');
	const gameFolderPath = path.join(gamesPath, params.slug);

	if (!existsSync(gameFolderPath)) {
		throw error(404, 'Game not found');
	}

	const files = await readdir(gameFolderPath);
	const htmlFile = files.find((f) => f.endsWith('.html'));

	if (!htmlFile) {
		throw error(404, 'Game HTML file not found');
	}

	return {
		slug: params.slug,
		name: params.slug
			.replace(/-/g, ' ')
			.replace(/_/g, ' ')
			.replace(/\b\w/g, (c: string) => c.toUpperCase()),
		htmlFile
	};
}
