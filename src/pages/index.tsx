import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import fs from 'fs';
import path from 'path';
import { GetStaticPropsResult } from 'next';

export default function Home(props) {
  return (
    <ul>
      {props.posts.map(post => (
        <li key={post}><Link href={`/posts/${post}`}>{post}</Link></li>
      ))}
    </ul>
  )
}

export function getStaticProps(): GetStaticPropsResult<any> {
  const postsDirectory = path.resolve('src/data/posts');
  const posts = fs.readdirSync(postsDirectory).map(f => f.replace(/\..*$/, ''));
  return { props: { posts } };
}
