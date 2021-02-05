import Head from 'next/head';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { getPostContent, listPosts, Post } from '../../app/posts';
import { CommentBox } from '../../app/comps/CommentBox';
import moment from 'moment';

interface PropsType {
    post: Post;
    postContent: string;
}

export default function PostPage(props: PropsType) {
    const publishDate = moment(props.post.publishDate);

    return (
        <>
            <Head>
                <title>{props.post.title} - c4compile</title>
            </Head>
            <header className="blog-post-header">
                <h2 className="title mb-2">{props.post.title}</h2>
                <div className="meta mb-3">
                    <span className="date" title={publishDate.format('LLL')}>Published {publishDate.fromNow()}</span>
                </div>
                <hr />
            </header>
            <div dangerouslySetInnerHTML={{ __html: props.postContent }} />
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