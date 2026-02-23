/**
 * Site Configuration
 * Edit these values to customize your site.
 */

export const site = {
	name: 'quiescent',
	tagline: 'a quiet corner of the web',
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
	listening: 'your fav album',
	reading: 'a good book',
	playing: 'a fun game',
	mood: 'cozy'
} as const;

export const updates = [
	{ date: '02/23', text: 'Site launched!' },
	{ date: '02/22', text: 'Added music player' },
	{ date: '02/21', text: 'Working on design' }
] as const;

export const webrings = [
	{ name: 'The Null Webring', prev: '#', next: '#', home: '#' },
	{ name: 'Cozy Corner Ring', prev: '#', next: '#', home: '#' }
] as const;
