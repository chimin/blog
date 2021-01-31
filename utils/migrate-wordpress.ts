import xmlParser from 'fast-xml-parser';
import fs from 'fs';
import path from 'path';
import commandLineArgs from 'command-line-args';
import prettier from 'prettier';

const { inputFile, outputDirectory, initialId } = commandLineArgs([
    { name: 'inputFile', type: String },
    { name: 'outputDirectory', type: String },
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

    const originalContent = item['content:encoded'];
    const formattedContent = prettier.format(originalContent, {
        parser: 'html',
        htmlWhitespaceSensitivity: 'ignore',
        printWidth: 120
    });

    fs.mkdirSync(outputDirectory, { recursive: true });
    const fileName = `${idGenerator.next()}.html`;
    const filePath = path.join(outputDirectory, fileName);
    fs.writeFileSync(filePath, formattedContent);

    console.log(`Generated ${fileName}`);
}
