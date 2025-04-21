import { buffer } from 'micro';
import Stripe from 'stripe';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  const sig = req.headers['stripe-signature'];
  const buf = await buffer(req);
  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_details.email;
    const productId = session.metadata.productId;

    // Send a basic thank‑you / next‑steps email
    await sgMail.send({
      to: email,
      from: 'no-reply@trapstrology.com',
      subject: `Your Trapstrology ${productId} details`,
      text: `Thank you for your purchase! We’ll be in touch with your personalized reading soon.`,
      html: `<p>Thank you for your purchase!</p><p>We’ll be in touch with your personalized reading soon.</p>`
    });
  }

  res.json({ received: true });
}
