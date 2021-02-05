import fs from 'fs';
import rss from 'rss';
import posts from '../src/data/posts.json';
import appConfig from '../src/data/appConfig.json';

const outputFile = 'public/rss.xml';

const feed = new rss({
    title: 'c4compile',
    site_url: appConfig.siteUrl,
    feed_url: `${appConfig.siteUrl}rss.xml`,
});

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