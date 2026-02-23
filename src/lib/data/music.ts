/**
 * 🎵 MUSIC DATA - Add your tracks here!
 *
 * To add music:
 * 1. Add your audio files to `static/music/` folder
 * 2. Add a track entry below with the filename
 *
 * Supported formats: mp3, ogg, wav
 */

export type Track = {
	title: string;
	artist: string;
	duration: string;
	file?: string; // Path to audio file in /static/music/
	cover?: string; // Path to cover image (optional)
};

export const tracks: Track[] = [
	{
		title: 'Track One',
		artist: 'Artist Name',
		duration: '3:45'
		// file: '/music/track-one.mp3'
	},
	{
		title: 'Another Song',
		artist: 'Cool Band',
		duration: '4:12'
	},
	{
		title: 'Chill Vibes',
		artist: 'Lo-Fi Producer',
		duration: '2:58'
	},
	{
		title: 'Night Drive',
		artist: 'Synthwave Artist',
		duration: '5:23'
	}
];

// Currently playing - update this manually or connect to Spotify/Last.fm
export const nowPlaying = {
	title: 'Song Title',
	artist: 'Artist Name',
	progress: 33 // percentage 0-100
};
