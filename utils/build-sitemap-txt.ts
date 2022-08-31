import fs from 'fs';
import appConfig from '../src/data/appConfig.json';
import { listPostsAsync } from '../src/app/posts';

(async function () {
    const outputFile = 'public/sitemap.txt';

    const ws = fs.createWriteStream(outputFile);
    const posts = await listPostsAsync();
    for (const post of posts) {
        ws.write(`${appConfig.siteUrl}/posts/${post.id}\n`);
    }
    ws.close();
})().catch(err => console.error(err));