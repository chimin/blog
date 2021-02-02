import Link from 'next/link'
import { GetStaticPropsResult } from 'next';
import { listPosts } from '../app/posts';

export default function Home(props) {
  return (
    <ul>
      {props.posts.map(post => (
        <li key={post}><Link href={`/posts/${post.id}`}>{post.title}</Link></li>
      ))}
    </ul>
  )
}

export function getStaticProps(): GetStaticPropsResult<any> {
  const posts = listPosts().slice(0).reverse();
  return { props: { posts } };
}
