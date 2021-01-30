import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import fs from 'fs';
import path from 'path';

export default function Home(props) {
  return (
    <ul>
      {props.posts.map(post => (
        <li key={post}><Link href={`/posts/${post}`}>{post}</Link></li>
      ))}
    </ul>
  )
}

export function getStaticProps() {
  const postsDirectory = path.resolve('src/pages/posts');
  const posts = fs.readdirSync(postsDirectory).map(f => f.replace(/\..*$/, ''));
  return { props: { posts } };
}
