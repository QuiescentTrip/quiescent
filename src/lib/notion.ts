import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { NOTION_API_KEY, NOTION_DATABASE_ID } from '$env/static/private';
import type { Post } from './types';

const notion = new Client({ auth: NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

export type NotionPost = Post & {
	notionId: string;
	content: string;
};

export async function getNotionPosts(): Promise<NotionPost[]> {
	if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
		console.warn('Notion not configured, using local posts');
		return [];
	}

	try {
		const response = await notion.databases.query({
			database_id: NOTION_DATABASE_ID,
			filter: {
				property: 'Published',
				checkbox: { equals: true }
			},
			sorts: [{ property: 'Date', direction: 'descending' }]
		});

		const posts: NotionPost[] = [];

		for (const page of response.results) {
			if (!('properties' in page)) continue;

			const props = page.properties;

			const title = getTitle(props.Title || props.Name);
			const slug = getSlug(props.Slug) || slugify(title);
			const date = getDate(props.Date);
			const tags = getTags(props.Tags);
			const excerpt = getRichText(props.Excerpt || props.Description);

			posts.push({
				notionId: page.id,
				slug,
				title,
				date,
				tags,
				excerpt,
				published: true,
				content: ''
			});
		}

		return posts;
	} catch (error) {
		console.error('Error fetching from Notion:', error);
		return [];
	}
}

export async function getNotionPost(slug: string): Promise<NotionPost | null> {
	if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
		return null;
	}

	try {
		const response = await notion.databases.query({
			database_id: NOTION_DATABASE_ID,
			filter: {
				and: [
					{ property: 'Published', checkbox: { equals: true } },
					{ property: 'Slug', rich_text: { equals: slug } }
				]
			}
		});

		if (response.results.length === 0) return null;

		const page = response.results[0];
		if (!('properties' in page)) return null;

		const props = page.properties;

		const mdBlocks = await n2m.pageToMarkdown(page.id);
		const mdString = n2m.toMarkdownString(mdBlocks);

		return {
			notionId: page.id,
			slug,
			title: getTitle(props.Title || props.Name),
			date: getDate(props.Date),
			tags: getTags(props.Tags),
			excerpt: getRichText(props.Excerpt || props.Description),
			published: true,
			content: mdString.parent
		};
	} catch (error) {
		console.error('Error fetching post from Notion:', error);
		return null;
	}
}

function getTitle(prop: unknown): string {
	if (!prop || typeof prop !== 'object') return 'Untitled';
	const p = prop as { type?: string; title?: Array<{ plain_text: string }> };
	if (p.type === 'title' && p.title?.[0]) {
		return p.title[0].plain_text;
	}
	return 'Untitled';
}

function getSlug(prop: unknown): string {
	if (!prop || typeof prop !== 'object') return '';
	const p = prop as { type?: string; rich_text?: Array<{ plain_text: string }> };
	if (p.type === 'rich_text' && p.rich_text?.[0]) {
		return p.rich_text[0].plain_text;
	}
	return '';
}

function getRichText(prop: unknown): string {
	if (!prop || typeof prop !== 'object') return '';
	const p = prop as { type?: string; rich_text?: Array<{ plain_text: string }> };
	if (p.type === 'rich_text' && p.rich_text) {
		return p.rich_text.map((t) => t.plain_text).join('');
	}
	return '';
}

function getDate(prop: unknown): string {
	if (!prop || typeof prop !== 'object') return new Date().toISOString().split('T')[0];
	const p = prop as { type?: string; date?: { start: string } };
	if (p.type === 'date' && p.date?.start) {
		return p.date.start;
	}
	return new Date().toISOString().split('T')[0];
}

function getTags(prop: unknown): string[] {
	if (!prop || typeof prop !== 'object') return [];
	const p = prop as { type?: string; multi_select?: Array<{ name: string }> };
	if (p.type === 'multi_select' && p.multi_select) {
		return p.multi_select.map((t) => t.name.toLowerCase());
	}
	return [];
}

function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}
