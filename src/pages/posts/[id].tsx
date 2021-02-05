import Head from 'next/head';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { getPostContent, listPosts } from '../../app/posts';
import { CommentBox } from '../../app/comps/CommentBox';

export default function Post(props) {
    return (
        <>
            <Head>
                <title>{props.title} - c4compile</title>
            </Head>
            <div dangerouslySetInnerHTML={{ __html: props.data }} />
            <CommentBox />
        </>
    );
}

export function getStaticProps(content: GetStaticPropsContext): GetStaticPropsResult<any> {
    const metadata = listPosts().find(post => post.id == Number(content.params.id));
    const data = getPostContent(content.params.id);
    return { props: { title: metadata.title, data } };
}

export function getStaticPaths(): GetStaticPathsResult {
    const posts = listPosts();
    return {
        paths: posts.map(post => ({ params: { id: String(post.id) } })),
        fallback: false
    };
}