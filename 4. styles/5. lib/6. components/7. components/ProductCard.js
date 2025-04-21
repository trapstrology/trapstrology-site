import { useRouter } from 'next/router';

export default function ProductCard({ product }) {
  const router = useRouter();
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <strong>${product.price.toFixed(2)}</strong>
      <div>
        <button onClick={() => router.push(`/product/${product.id}`)}>
          Book Your Reading →
        </button>
      </div>
    </div>
  );
}
