import fs from 'fs';
import path from 'path';
import posts from '../data/posts.json';

export interface Post {
    id: number;
    title: string;
    publishDate: string;
    tags: string[];
}

export function listPosts(): Post[] {
    return posts.filter(post => post.publishDate);
}

export function getPostContent(id: Post['id']) {
    if (!posts.find(post => post.id == id && post.publishDate)) {
        return;
    }

    const filePath = path.join('src/data/posts', `${id}.html`);
    return fs.readFileSync(filePath, 'utf8');
}