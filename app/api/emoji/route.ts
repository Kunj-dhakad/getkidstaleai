import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { url } = await req.json(); 

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    const data = await response.text();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching URL:', error);
    return NextResponse.json({ error: 'Error fetching the URL' }, { status: 500 });
  }
}


