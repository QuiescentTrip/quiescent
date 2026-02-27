/**
 * 🎵 MUSIC DATA
 *
 * Tracks are auto-detected from the `static/music/` folder.
 * Each subfolder becomes its own player section.
 *
 * Supported formats: mp3, ogg, wav, m4a, flac, webm
 *
 * File naming conventions for metadata:
 * - "Artist - Title.mp3" → Artist: "Artist", Title: "Title"
 * - "song-name.mp3" → Artist: "Unknown Artist", Title: "song name"
 *
 * Tracks are sorted by file modification time (newest first).
 */

export type Track = {
	title: string;
	artist: string;
	duration: string;
	file?: string;
	cover?: string;
};

export type MusicFolder = {
	name: string;
	tracks: Track[];
};

export async function loadMusicFolders(): Promise<MusicFolder[]> {
	try {
		const response = await fetch('/api/music');
		const data = await response.json();
		return data.folders ?? [];
	} catch (error) {
		console.error('Failed to load music folders:', error);
		return [];
	}
}