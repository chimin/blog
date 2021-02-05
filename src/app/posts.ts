import fs from 'fs';
import path from 'path';
import posts from '../data/posts.json';

export function listPosts() {
    return posts.filter(post => post.publishDate);
}

export function getPostContent(id: unknown) {
    if (!posts.find(post => post.id == id && post.publishDate)) {
        return;
    }

    const filePath = path.join('src/data/posts', `${id}.html`);
    return fs.readFileSync(filePath, 'utf8');
}