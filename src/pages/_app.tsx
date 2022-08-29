import Head from 'next/head';
import Link from 'next/link';
import '../styles/scss/theme-7.scss'
import '../styles/overrides.scss'
import '../styles/styles.scss'
import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/analytics';
import { SubscribeButton } from '../app/comps/SubscribeButton';
import appConfig from '../data/appConfig.json';
import { SearchContext } from '../app/contexts/SearchContext';

function MyApp({ Component, pageProps }) {
  const [searchIsLoaded, setSearchIsLoaded] = useState(false);

  useEffect(() => {
    if (!location.href.startsWith(appConfig.siteUrl) && !location.href.startsWith('http://localhost:')) {
      location.href = appConfig.siteUrl;
    }
  });

  useEffect(() => {
    if (firebase.apps.length) return;

    firebase.initializeApp(appConfig.firebase);
    firebase.analytics();
  }, []);

  useEffect(() => {
    (window as any).__gcse = {
      parsetags: 'explicit',
      callback: () => setSearchIsLoaded(true)
    };

    const gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = appConfig.googleSearchJsUrl

    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  }, []);

  const topAd = `
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7352271602634363"
  crossorigin="anonymous"></script>
<!-- Top ad -->
<ins class="adsbygoogle"
  style="display:block;width:728px;height:50px;margin:auto"
  data-ad-client="ca-pub-7352271602634363"
  data-ad-slot="2478298726"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>`;

  return (
    <>
      <Head>
        <title>c4compile</title>

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-site-verification" content="fPu4m-YbBKW9n0ELcvicbtB8a6F11uThdjXHTiDfYno" />

        <link rel="alternate" type="application/rss+xml" href="rss.xml" />

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7352271602634363"
          crossOrigin="anonymous"></script>

        <script defer
          src="https://use.fontawesome.com/releases/v5.7.1/js/all.js"
          integrity="sha384-eVEQC9zshBn0rFj4+TU78eNA19HMNigMviK/PU/FFjLXqa/GKPgX58rvt5Z8PLs7"
          crossOrigin="anonymous"></script>
      </Head>

      <SearchContext.Provider value={{ isLoaded: searchIsLoaded }}>
        <header className="header">
          <div className="title"><Link href="/">c4compile</Link></div>
          <div className="sub">Compile outputs fun</div>
          <div className="nav">
            <SubscribeButton />
          </div>
        </header>

        <div className="main-wrapper">
          <section className="top-ad px-3 pt-3 pb-1">
            <div dangerouslySetInnerHTML={{ __html: topAd }} />
          </section>

          <section className="blog-list px-3 py-5 p-md-5">
            <Component {...pageProps} />
          </section>
        </div>
      </SearchContext.Provider>
    </>
  )
}

export default MyApp
