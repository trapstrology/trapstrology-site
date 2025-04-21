import { useRouter } from 'next/router';
import Head from 'next/head';
import { products } from '../../lib/products';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const product = products.find(p => p.id === id);
  if (!product) return <p>Product not found</p>;

  const handleBuy = async () => {
    const res = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.id })
    });
    const { url } = await res.json();
    window.location = url;
  };

  return (
    <>
      <Head>
        <title>{product.name} • Trapstrology</title>
      </Head>
      <div className="container">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <strong>${product.price.toFixed(2)}</strong>
        <div style={{ marginTop: '1rem' }}>
          <button onClick={handleBuy}>Book Your Reading →</button>
        </div>
      </div>
    </>
  );
}
