import { NextResponse } from 'next/server';

export async function GET(request) {
  return NextResponse.json({ text: 'todo ladna strona powitalna api' });
}
