import fs from 'fs';
import appConfig from '../src/data/appConfig.json';
import { listPostsAsync } from '../src/app/posts';

(async function () {
    const outputFile = 'public/sitemap.xml';

    const ws = fs.createWriteStream(outputFile);
    ws.write('<?xml version="1.0" encoding="UTF-8"?>\n');
    ws.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n');

    const posts = await listPostsAsync();
    for (const post of posts) {
        const url = `${appConfig.siteUrl}/posts/${post.id}`;
        ws.write(`<url><loc>${url}</loc></url>\n`);
    }

    ws.write('</urlset>\n');
    ws.close();
})().catch(err => console.error(err));