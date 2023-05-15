import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const page = searchParams.get('page');

  return NextResponse.json({ text: 'recipes endpoint', page });
}
