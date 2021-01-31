import xmlParser from 'fast-xml-parser';
import fs from 'fs';
import path from 'path';
import commandLineArgs from 'command-line-args';
import prettier from 'prettier';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import { URL } from 'url';

(async () => {
    const { inputFile, outputDirectory, assetDirectory, assetPublicPath, initialId } = commandLineArgs([
        { name: 'inputFile', type: String },
        { name: 'outputDirectory', type: String },
        { name: 'assetDirectory', type: String },
        { name: 'assetPublicPath', type: String },
        { name: 'initialId', type: Number, defaultValue: 1 }
    ]);

    const idGenerator = new class {
        private id = initialId;
        next() {
            return this.id++;
        }
    };

    const xml = xmlParser.parse(fs.readFileSync(inputFile, 'utf8'));
    for (const item of xml.rss.channel.item) {
        if (item['wp:post_type'] != 'post') {
            continue;
        }

        const postId = idGenerator.next();

        const originalContent = item['content:encoded'];
        const $ = cheerio.load(originalContent);
        $('*').contents()
            .filter((_, e) => (e.type as string) == 'comment')
            .remove();

        const images = $('img');
        for (const e of images.toArray()) {
            const image = $(e);

            const src = image.attr('src');
            const srcUrl = new URL(src);
            const fileName = srcUrl.pathname.match(/\/([^/]*)$/)[1];
            console.log(`Download ${fileName} from ${srcUrl}`);

            const response = await fetch(src);
            const postAssetDirectory = path.join(assetDirectory, String(postId));
            fs.mkdirSync(postAssetDirectory, { recursive: true });
            await new Promise(resolve => {
                const writeStream = fs.createWriteStream(path.join(postAssetDirectory, fileName));
                response.body.pipe(writeStream, { end: true });
                writeStream.on('close', resolve);
            });

            image.attr('src', `${assetPublicPath}/${postId}/${fileName}`);
        }

        const formattedContent = prettier.format($.root().find('body').html(), {
            parser: 'html',
            htmlWhitespaceSensitivity: 'ignore',
            printWidth: 120
        });

        fs.mkdirSync(outputDirectory, { recursive: true });
        const fileName = `${postId}.html`;
        const filePath = path.join(outputDirectory, fileName);
        console.log(`Generate ${fileName}`);
        fs.writeFileSync(filePath, formattedContent);
    }
})();