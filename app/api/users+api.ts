import axios from 'axios';

export async function GET(req: Request) {
  const API_URL = process.env.NOCODB_API_URL! + 'tables/mlgzqykdfwb1mzu/records'; // e.g. https://app.nocodb.com/api/v2/tables
  const API_TOKEN = process.env.NOCODB_API_TOKEN!;
  const baseUrl = `${API_URL}`;
  const search = new URL(req.url).search;
  try {
    const res = await axios.get(`${baseUrl}${search}`, {
      headers: {
        'Content-Type': 'application/json',
        'xc-token': API_TOKEN,
      },
    });
    return new Response(JSON.stringify(res.data), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.response?.status || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req: Request) {
  const API_URL = process.env.NOCODB_API_URL! + 'tables/mlgzqykdfwb1mzu/records';
  const API_TOKEN = process.env.NOCODB_API_TOKEN!;
  try {
    const body = await req.json();
    const res = await axios.post(API_URL, body, {
      headers: {
        'Content-Type': 'application/json',
        'xc-token': API_TOKEN,
      },
    });
    return new Response(JSON.stringify(res.data), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.response?.status || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(req: Request) {
  const API_URL = process.env.NOCODB_API_URL! + 'tables/mlgzqykdfwb1mzu/records/';
  const API_TOKEN = process.env.NOCODB_API_TOKEN!;
  try {
    const body = await req.json();
    const { id, ...data } = body;
    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing id for update' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const res = await axios.put(API_URL + id, data, {
      headers: {
        'Content-Type': 'application/json',
        'xc-token': API_TOKEN,
      },
    });
    return new Response(JSON.stringify(res.data), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.response?.status || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(req: Request) {
  const API_URL = process.env.NOCODB_API_URL! + 'tables/mlgzqykdfwb1mzu/records/';
  const API_TOKEN = process.env.NOCODB_API_TOKEN!;
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing id for delete' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const res = await axios.delete(API_URL + id, {
      headers: {
        'Content-Type': 'application/json',
        'xc-token': API_TOKEN,
      },
    });
    return new Response(JSON.stringify(res.data), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.response?.status || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
