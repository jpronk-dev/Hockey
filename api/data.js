import { list, head } from '@vercel/blob';

const VALID_KEYS = ['players', 'lineup', 'match-times', 'tasks'];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { key } = req.query;

  if (!key || !VALID_KEYS.includes(key)) {
    return res.status(400).json({ error: 'Invalid key. Use: ' + VALID_KEYS.join(', ') });
  }

  try {
    const blobPath = `data/${key}.json`;

    // Check if blob exists by listing with prefix
    const { blobs } = await list({ prefix: blobPath });
    const blob = blobs.find(b => b.pathname === blobPath);

    if (!blob) {
      // Return default empty data
      res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
      return res.status(200).json({ data: null });
    }

    // Fetch the blob content
    const response = await fetch(blob.url);
    const data = await response.json();

    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
    return res.status(200).json({ data });
  } catch (error) {
    console.error('Error reading blob:', error);
    return res.status(500).json({ error: 'Failed to read data' });
  }
}
