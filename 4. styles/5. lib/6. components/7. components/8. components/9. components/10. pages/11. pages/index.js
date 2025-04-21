import Head from 'next/head';
import Header from '../components/Header';
import YouTubePlayer from '../components/YouTubePlayer';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { products } from '../lib/products';

export default function Home() {
  return (
    <>
      <Head>
        <title>Trapstrology • Unlock Your Cosmic Blueprint</title>
        <meta name="description" content="Book astrology & numerology readings." />
      </Head>
      <Header />

      {/* Auto‑playing YouTube uploads carousel */}
      <YouTubePlayer />

      <main className="container">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}

        {/* Waitlist section */}
        <section style={{ padding: '2rem 0' }}>
          <h2>The Only Astro Tips You’ll Need</h2>
          <p>Join the waitlist and the first 10 customers get 50% off.</p>
          <form action="/api/signup" method="post">
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              style={{ padding: '0.5rem', width: '60%' }}
            />
            <button type="submit">Join Waitlist</button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}
