import Head from 'next/head';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { getPostContentAsync, listPostsAsync, Post } from '../../app/posts';
import { CommentBox } from '../../app/comps/CommentBox';
import { PostHeader } from '../../app/comps/PostHeader';

interface PropsType {
    post: Post;
    postContent: string;
}

export default function PostPage(props: PropsType) {
    return (
        <>
            <PostHeader post={props.post} />
            <div className="post" dangerouslySetInnerHTML={{ __html: props.postContent }} />
            <CommentBox />
        </>
    );
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<PropsType>> {
    const postId = Number(context.params.id);
    const metadata = (await listPostsAsync()).find(post => post.id == postId);
    if (!metadata) return { notFound: true };

    const data = await getPostContentAsync(Number(context.params.id));
    return { props: { post: metadata, postContent: data } };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const posts = await listPostsAsync();
    return {
        paths: posts.map(post => ({ params: { id: String(post.id) } })),
        fallback: false
    };
}