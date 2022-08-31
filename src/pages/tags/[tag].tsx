import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { listPostsAsync, Post } from '../../app/posts';
import { PostListItem } from '../../app/comps/PostListItem';
import { SearchBox } from '../../app/comps/SearchBox';

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

export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<PropsType>> {
  if (!context.params.tag) return { notFound: true };

  const tag = String(context.params.tag);
  const posts = (await listPostsAsync()).filter(p => p.tags?.indexOf(tag) >= 0).slice(0).reverse();
  return { props: { posts } };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const posts = await listPostsAsync();
  const tags = Array.from(new Set(posts.flatMap(p => p.tags)));
  return {
    paths: tags.map(tag => ({ params: { tag } })),
    fallback: false
  };
}