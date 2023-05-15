import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { slug } = params;
  return NextResponse.json({ text: 'one recipe endpoint', slug });
}
