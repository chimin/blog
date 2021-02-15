import Link from 'next/link'
import { GetStaticPropsResult } from 'next';
import { listPosts, Post } from '../app/posts';
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

export function getStaticProps(): GetStaticPropsResult<PropsType> {
  const posts = listPosts().slice(0).reverse();
  return { props: { posts } };
}
