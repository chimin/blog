import moment from "moment";
import Head from "next/head";
import { Post } from "../posts";
import { PostTags } from "./PostTags";

interface PropsType {
    post: Post;
}

export function PostHeader(props: PropsType) {
    const publishDate = moment(props.post.publishDate);

    return <>
        <Head>
            <title>{props.post.title} - c4compile</title>
        </Head>
        <header className="blog-post-header">
            <h2 className="title mb-2">{props.post.title}</h2>
            <div className="meta mb-3">
                <span className="date" title={publishDate.format('LLL')}>Published {publishDate.fromNow()}</span>
                <span className="tags"><PostTags tags={props.post.tags} /></span>
            </div>
            <hr />
        </header>
    </>;
}
