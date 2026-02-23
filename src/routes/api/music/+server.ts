import { json } from '@sveltejs/kit';
import { readdir, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import type { RequestHandler } from './$types';

const MUSIC_DIR = 'static/music';
const SUPPORTED_EXTENSIONS = ['.mp3', '.ogg', '.wav', '.m4a', '.flac', '.webm'];

function parseFilename(filename: string): { title: string; artist: string } {
	const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');

	if (nameWithoutExt.includes(' - ')) {
		const [artist, ...titleParts] = nameWithoutExt.split(' - ');
		return {
			artist: artist.trim(),
			title: titleParts.join(' - ').trim()
		};
	}

	return {
		title: nameWithoutExt.replace(/[-_]/g, ' ').trim(),
		artist: 'Unknown Artist'
	};
}

function isMusicFile(filename: string): boolean {
	const ext = filename.toLowerCase().slice(filename.lastIndexOf('.'));
	return SUPPORTED_EXTENSIONS.includes(ext);
}

type TrackWithMtime = {
	title: string;
	artist: string;
	file: string;
	duration: string;
	mtime: number;
};

async function getTracksFromDir(dirPath: string, urlPrefix: string): Promise<TrackWithMtime[]> {
	if (!existsSync(dirPath)) return [];

	const entries = await readdir(dirPath, { withFileTypes: true });
	const tracks: TrackWithMtime[] = [];

	for (const entry of entries) {
		if (entry.isFile() && isMusicFile(entry.name)) {
			const filePath = join(dirPath, entry.name);
			const fileStat = await stat(filePath);
			const { title, artist } = parseFilename(entry.name);

			tracks.push({
				title,
				artist,
				file: `${urlPrefix}/${entry.name}`,
				duration: '',
				mtime: fileStat.mtimeMs
			});
		}
	}

	// Sort by modification time, newest first
	tracks.sort((a, b) => b.mtime - a.mtime);
	return tracks;
}

export type MusicFolder = {
	name: string;
	tracks: Omit<TrackWithMtime, 'mtime'>[];
};

// Prerender at build time so it works on static hosts
export const prerender = true;

export const GET: RequestHandler = async () => {
	try {
		if (!existsSync(MUSIC_DIR)) {
			return json({ folders: [] });
		}

		const entries = await readdir(MUSIC_DIR, { withFileTypes: true });
		const folders: MusicFolder[] = [];

		// Get subfolders
		for (const entry of entries) {
			if (entry.isDirectory()) {
				const folderPath = join(MUSIC_DIR, entry.name);
				const tracks = await getTracksFromDir(folderPath, `/music/${entry.name}`);

				if (tracks.length > 0) {
					folders.push({
						name: entry.name,
						// Remove mtime from response
						tracks: tracks.map(({ mtime, ...rest }) => rest)
					});
				}
			}
		}

		// Also get tracks in root music folder
		const rootTracks = await getTracksFromDir(MUSIC_DIR, '/music');
		if (rootTracks.length > 0) {
			folders.unshift({
				name: 'tracks',
				tracks: rootTracks.map(({ mtime, ...rest }) => rest)
			});
		}

		return json({ folders });
	} catch (error) {
		console.error('Error reading music directory:', error);
		return json({ folders: [] });
	}
};
