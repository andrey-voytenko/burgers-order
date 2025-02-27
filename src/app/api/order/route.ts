import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { data } = await req.json();

  if (!data) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const blob = await put(`orders.json`, JSON.stringify(data), {
    access: 'public',
  });

  return NextResponse.json({ message: 'Saved successfully', url: blob.url });
}
