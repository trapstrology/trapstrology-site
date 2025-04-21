import Stripe from 'stripe';
import { products } from '../../lib/products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { productId } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(400).json({ error: 'Invalid product' });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: product.name },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/?canceled=true`,
    metadata: { productId: product.id },
  });

  res.status(200).json({ url: session.url });
}
