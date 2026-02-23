import type { Component } from 'svelte';

export type PostMetadata = {
	title: string;
	date: string;
	tags: string[];
	excerpt: string;
	published: boolean;
};

export type Post = PostMetadata & {
	slug: string;
};

export type PostModule = {
	default: Component;
	metadata: PostMetadata;
};
