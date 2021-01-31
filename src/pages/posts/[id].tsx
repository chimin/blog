import path from 'path';
import fs from 'fs';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { getPostContent, listPosts } from '../../app/posts';

export default function Post(props) {
    return (
        <div dangerouslySetInnerHTML={{ __html: props.data }} />
    );
}

export function getStaticProps(content: GetStaticPropsContext): GetStaticPropsResult<any> {
    const data = getPostContent(content.params.id);
    return { props: { data } };
}

export function getStaticPaths(): GetStaticPathsResult {
    const posts = listPosts();
    return {
        paths: posts.map(post => ({ params: { id: String(post.id) } })),
        fallback: false
    };
}