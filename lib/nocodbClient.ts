// lib/nocodbClient.ts
const API_URL = process.env.EXPO_PUBLIC_NOCODB_API_URL; // e.g. https://nocodb.example.com/api/v1
const API_TOKEN = process.env.EXPO_PUBLIC_NOCODB_API_TOKEN;

export async function nocodbFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'xc-token': API_TOKEN!,
      ...options.headers,
    },
  });

  if (!res.ok) throw new Error(`NocoDB error: ${res.statusText}`);
  return res.json();
}
