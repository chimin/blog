import Head from 'next/head';
import Link from 'next/link';
import '../styles/scss/theme-7.scss'
import '../styles/overrides.scss'
import { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/analytics';


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    try {
      if (firebase.app()) {
        return;
      }
    } catch (e) {
      return;
    }

    const firebaseConfig = {
      apiKey: "AIzaSyCNXB6sOLfj7jE55MAhZMOKnAt-x9InnEc",
      authDomain: "c4compile-2f38c.firebaseapp.com",
      projectId: "c4compile-2f38c",
      storageBucket: "c4compile-2f38c.appspot.com",
      messagingSenderId: "195656641927",
      appId: "1:195656641927:web:07b0a048ce726a3ecef722",
      measurementId: "G-VH2DH3NLHL"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }, []);

  return (
    <>
      <Head>
        <title>c4compile</title>

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <script defer
          src="https://use.fontawesome.com/releases/v5.7.1/js/all.js"
          integrity="sha384-eVEQC9zshBn0rFj4+TU78eNA19HMNigMviK/PU/FFjLXqa/GKPgX58rvt5Z8PLs7"
          crossOrigin="anonymous"></script>
      </Head>

      <header className="header">
        <div className="title"><Link href="/">c4compile</Link></div>
        <div className="sub">Compile outputs fun</div>
      </header>

      <div className="main-wrapper">
        <section className="blog-list px-3 py-5 p-md-5">
          <Component {...pageProps} />
        </section>
      </div>
    </>
  )
}

export default MyApp
