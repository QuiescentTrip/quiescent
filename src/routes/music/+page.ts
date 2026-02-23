import { loadMusicFolders } from '$lib/data/music';

export const prerender = true;

export async function load() {
	const folders = await loadMusicFolders();
	return { folders };
}
