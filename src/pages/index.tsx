import Link from 'next/link'
import { GetStaticPropsResult } from 'next';
import { listPostsAsync, Post } from '../app/posts';
import { PostListItem } from '../app/comps/PostListItem';
import { SearchBox } from '../app/comps/SearchBox';

interface PropsType {
  posts: Post[];
}

export default function HomePage(props: PropsType) {
  return (
    <>
      <SearchBox />
      <ul>
        {props.posts.map(post => (
          <li key={post.id}><PostListItem post={post} /></li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<PropsType>> {
  const posts = (await listPostsAsync()).slice(0).reverse();
  return { props: { posts } };
}
