import { once } from 'events';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

export interface Post {
    id: number;
    title: string;
    publishDate: string;
    tags: string[];
}

const dataDirectory = 'src/data/posts';

var posts: Post[];

async function initializePostsAsync() {
    if (posts) return;

    posts = [];

    const files = fs.readdirSync(dataDirectory);
    for (const fileName of files) {
        const post: Partial<Post> = {
            id: Number(path.basename(fileName, path.extname(fileName)))
        };

        var isCompleted = false;
        const rl = readline.createInterface(fs.createReadStream(path.join(dataDirectory, fileName)));
        rl.on('line', line => {
            if (isCompleted) return;

            const match = line.match(/^(.*?):(.*)$/);
            if (!match) {
                isCompleted = true;
                rl.close();
                return;
            }

            const key = match[1].trim() as keyof Post;
            const value = match[2].trim();
            switch (key) {
                case 'title': post.title = value; break;
                case 'publishDate': post.publishDate = value; break;
                case 'tags': post.tags = value.split(/\s+,\s+/); break;
                default: throw new Error(`Unrecognized key ${key}`);
            }
        });
        await once(rl, 'close');
        posts.push(post as Post);
    }

    posts.sort((a, b) => a.id - b.id);

    console.log(posts);
}

export async function listPostsAsync(): Promise<Post[]> {
    await initializePostsAsync();

    return posts.filter(post => post.publishDate);
}

export async function getPostContentAsync(id: Post['id']) {
    await initializePostsAsync();

    if (!posts.find(post => post.id == id && post.publishDate)) {
        return;
    }

    const filePath = path.join(dataDirectory, `${id}.html`);
    if (!fs.existsSync(filePath)) {
        return;
    }

    var isHeader = true;
    var content = '';
    const rl = readline.createInterface(fs.createReadStream(filePath));
    rl.on('line', line => {
        if (isHeader) {
            const match = line.match(/^(.*?):(.*)$/);
            isHeader = !!match;
            return;
        }

        content += line + '\n';
    });
    await once(rl, 'close');

    return content.replace(/https:\/\/c4compile\.me\/\d+\/\d+\/\d+\/(.*)\//g, (matched, encodedTitle: string) => {
        var normalizedTitle = encodedTitle.toLowerCase().replace(/[^0-9a-z]/g, '');
        var post = posts.find(post => post.title.toLowerCase().replace(/[^0-9a-z]/g, '') == normalizedTitle);
        if (!post) return matched;

        return `/posts/${post.id}`;
    });
}