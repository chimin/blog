import moment from 'moment';
import Link from 'next/link';
import { Post } from '../posts';

interface PropsType {
    post: Post;
};

export function PostListItem(props: PropsType) {
    const publishDate = moment(props.post.publishDate);

    return (
        <>
            <Link href={`/posts/${props.post.id}`}>{props.post.title}</Link>
            <div className="meta mb-1">
                <span className="date" title={publishDate.format('LLL')}>Published {publishDate.fromNow()}</span>
            </div>
        </>
    );
}