import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, role, subject, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'Sunflower Petals <onboarding@resend.dev>',
      to: 'ssamreshan@gmail.com',
      subject: `New Contact Inquiry: ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FFCE04;">New Contact Inquiry</h1>
          <p>You have received a new message from the Sunflower Petals contact form:</p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Role:</strong> ${role}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>

          <h2 style="font-size: 18px; margin-top: 30px;">Message:</h2>
          <p style="white-space: pre-wrap; line-height: 1.6; color: #333;">${message}</p>

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
    console.error("Contact API error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
