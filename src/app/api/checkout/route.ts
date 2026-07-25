import { Resend } from 'resend';
import { NextResponse } from 'next/server';

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

interface CheckoutRequest {
  name: string;
  phone: string;
  items: CartItem[];
  subtotal: number;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY environment variable");
      return NextResponse.json({ error: 'Resend API key is not configured' }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { name, phone, items, subtotal }: CheckoutRequest = await request.json();

    // Format the email content
    const itemsList = items
      .map((item: CartItem) => `- ${item.name} (x${item.quantity}): NPR ${item.price * item.quantity}`)
      .join('\n');

    const { data, error } = await resend.emails.send({
      from: 'Sunflower Petals <onboarding@resend.dev>',
      to: 'ssamreshan@gmail.com',
      subject: `New Order Inquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FFCE04;">New Order Inquiry</h1>
          <p>You have received a new order inquiry from the Sunflower Petals website:</p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Customer Name:</strong> ${name}</p>
            <p><strong>Contact Number:</strong> ${phone}</p>
          </div>

          <h2 style="font-size: 18px; margin-top: 30px;">Items in Basket:</h2>
          <ul style="list-style: none; padding: 0;">
            ${items
              .map(
                (item: CartItem) => `
              <li style="padding: 10px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;">
                <span><strong>${item.name}</strong> (x${item.quantity})</span>
                <span style="color: #666;">NPR ${item.price * item.quantity}</span>
              </li>
            `
              )
              .join('')}
          </ul>

          <div style="margin-top: 20px; text-align: right; font-size: 20px; font-weight: bold;">
            Total: NPR ${subtotal}
          </div>

          <p style="margin-top: 40px; color: #999; font-size: 12px;">
            This inquiry was sent automatically from sunflowerpetals.com
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Checkout API error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
