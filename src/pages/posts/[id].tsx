import path from 'path';
import fs from 'fs';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';

export default function Post(props) {
    return (
        <div dangerouslySetInnerHTML={{ __html: props.data }} />
    );
}

export function getStaticProps(content: GetStaticPropsContext): GetStaticPropsResult<any> {
    const dataDirectory = path.resolve('src/data/posts');
    const data = fs.readFileSync(path.join(dataDirectory, `${content.params.id}.html`), 'utf8');
    return { props: { data } };
}

export function getStaticPaths(): GetStaticPathsResult {
    const postsDirectory = path.resolve('src/data/posts');
    const posts = fs.readdirSync(postsDirectory).map(f => f.replace(/\..*$/, ''));
    return {
        paths: posts.map(post => ({ params: { id: post } })),
        fallback: false
    };
}