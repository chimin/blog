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
    if (!fs.existsSync(filePath)) {
        return;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    return content.replace(/https:\/\/c4compile\.me\/\d+\/\d+\/\d+\/(.*)\//g, (matched, encodedTitle: string) => {
        var normalizedTitle = encodedTitle.toLowerCase().replace(/[^0-9a-z]/g, '');
        var post = posts.find(post => post.title.toLowerCase().replace(/[^0-9a-z]/g, '') == normalizedTitle);
        if (!post) return matched;

        return `/posts/${post.id}`;
    });
}