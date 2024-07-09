import { sendMail } from '@/lib/mailer';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { to, subject, text, html } = await req.json();

  try {
    await sendMail({ to, subject, text, html });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}