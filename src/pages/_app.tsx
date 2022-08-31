import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import '../styles/scss/theme-7.scss'
import '../styles/overrides.scss'
import '../styles/styles.scss'
import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/analytics';
import { SubscribeButton } from '../app/comps/SubscribeButton';
import appConfig from '../data/appConfig.json';
import { initializeSearch } from '../app/states/SearchState';
import { TopAd } from '../app/comps/TopAd';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (!location.href.startsWith(appConfig.siteUrl) && !location.href.startsWith('http://localhost:')) {
      location.href = appConfig.siteUrl;
    }
  }, []);

  useEffect(() => {
    if (firebase.apps.length) return;

    firebase.initializeApp(appConfig.firebase);
    firebase.analytics();
  }, []);

  useEffect(() => {
    initializeSearch();
  }, []);

  return (
    <>
      <Head>
        <title>c4compile</title>

        <meta key="charset" charSet="utf-8" />
        <meta key="compatible" httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta key="viewpot" name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta key="google-site-verification" name="google-site-verification" content="fPu4m-YbBKW9n0ELcvicbtB8a6F11uThdjXHTiDfYno" />

        <link key="rss" rel="alternate" type="application/rss+xml" href="rss.xml" />
      </Head>

      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7352271602634363"
        crossOrigin="anonymous"></Script>

      <Script defer
        src="https://use.fontawesome.com/releases/v5.7.1/js/all.js"
        integrity="sha384-eVEQC9zshBn0rFj4+TU78eNA19HMNigMviK/PU/FFjLXqa/GKPgX58rvt5Z8PLs7"
        crossOrigin="anonymous"></Script>

      <header className="header">
        <div className="title"><Link href="/">c4compile</Link></div>
        <div className="sub">Compile outputs fun</div>
        <div className="nav">
          <SubscribeButton />
        </div>
      </header>

      <div className="main-wrapper">
        <section className="top-ad px-3 pt-3 pb-1">
          <TopAd />
        </section>

        <section className="blog-list px-3 py-5 p-md-5">
          <Component {...pageProps} />
        </section>
      </div>
    </>
  )
}

export default MyApp
