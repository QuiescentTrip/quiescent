/**
 * Site Configuration
 * Edit these values to customize your site.
 */

export const site = {
	name: 'quiescent',
	tagline: '--- quiet, still, or inactive',
	author: 'quiescent',
	description: 'personal website — music, thoughts, links',

	socials: {
		github: 'https://github.com',
		twitter: 'https://twitter.com',
		discord: 'https://discord.com',
		email: 'mailto:hello@example.com',
		spotify: 'https://spotify.com'
	},

	established: '2026',
	hosting: 'neocities'
} as const;

export const now = {
	listening: 'ambient playlists',
	reading: 'too many browser tabs',
	playing: 'nothing rn',
	mood: 'quiet'
} as const;

export const updates = [
	{ date: '02/23', text: 'redesigned the whole site' },
	{ date: '02/22', text: 'added music player' },
	{ date: '02/21', text: 'started building' }
] as const;

export const webrings = [
	{ name: 'The Null Webring', prev: '#', next: '#', home: '#' },
	{ name: 'Cozy Corner Ring', prev: '#', next: '#', home: '#' }
] as const;
