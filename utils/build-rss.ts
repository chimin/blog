import fs from 'fs';
import rss from 'rss';
import appConfig from '../src/data/appConfig.json';
import { listPostsAsync } from '../src/app/posts';

(async function () {
    const outputFile = 'public/rss.xml';

    const feed = new rss({
        title: 'c4compile',
        site_url: appConfig.siteUrl,
        feed_url: `${appConfig.siteUrl}rss.xml`,
    });

    const posts = await listPostsAsync();
    for (const post of posts) {
        feed.item({
            title: post.title,
            description: '',
            date: post.publishDate,
            categories: post.tags,
            url: `${appConfig.siteUrl}/posts/${post.id}`
        });
    }

    fs.writeFileSync(outputFile, feed.xml({ indent: true }));
})().catch(err => console.error(err));