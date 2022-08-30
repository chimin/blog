import Head from 'next/head';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { getPostContent, listPosts, Post } from '../../app/posts';
import { CommentBox } from '../../app/comps/CommentBox';
import moment from 'moment';
import { PostHeader } from '../../app/comps/PostHeader';

interface PropsType {
    post: Post;
    postContent: string;
}

export default function PostPage(props: PropsType) {
    return (
        <>
            <Head>
                <title>{props.post.title} - c4compile</title>
            </Head>
            <PostHeader post={props.post} />
            <div className="post" dangerouslySetInnerHTML={{ __html: props.postContent }} />
            <CommentBox />
        </>
    );
}

export function getStaticProps(content: GetStaticPropsContext): GetStaticPropsResult<PropsType> {
    const metadata = listPosts().find(post => post.id == Number(content.params.id));
    const data = getPostContent(Number(content.params.id));
    return { props: { post: metadata, postContent: data } };
}

export function getStaticPaths(): GetStaticPathsResult {
    const posts = listPosts();
    return {
        paths: posts.map(post => ({ params: { id: String(post.id) } })),
        fallback: false
    };
}