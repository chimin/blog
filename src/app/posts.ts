import fs from 'fs';
import path from 'path';

export function listPosts() {
    return require('../data/posts.json');
}

export function getPostContent(id: unknown) {
    const filePath = path.join('src/data/posts', `${id}.html`);
    return fs.readFileSync(filePath, 'utf8');
}