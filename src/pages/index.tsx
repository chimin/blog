import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import fs from 'fs';
import path from 'path';
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
  const posts = listPosts().reverse();
  return { props: { posts } };
}
