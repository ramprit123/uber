export async function GET(req: Request) {
  return new Response('Hello, Next.js!');
}

export async function POST(request: Request) {
  const body = await request.json();

  return Response.json({ name: 'Daaaa' });
}
