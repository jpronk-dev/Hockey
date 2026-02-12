import { put } from '@vercel/blob';
import { createHash } from 'crypto';

const VALID_KEYS = ['players', 'lineup', 'match-times', 'tasks'];
const ADMIN_PIN_HASH = '2c52330077a08ea7f0795ff8786dc5c50f160359cbb1c0fe6708ea026cfd34e3';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { pin, key, data } = req.body;

  if (!pin || !key || data === undefined) {
    return res.status(400).json({ error: 'Missing pin, key, or data' });
  }

  if (!VALID_KEYS.includes(key)) {
    return res.status(400).json({ error: 'Invalid key' });
  }

  // Verify PIN server-side
  const pinHash = createHash('sha256').update(pin).digest('hex');
  if (pinHash !== ADMIN_PIN_HASH) {
    return res.status(403).json({ error: 'Invalid PIN' });
  }

  try {
    const blobPath = `data/${key}.json`;
    const blob = await put(blobPath, JSON.stringify(data), {
      contentType: 'application/json',
      access: 'public',
      addRandomSuffix: false,
    });

    return res.status(200).json({ success: true, url: blob.url });
  } catch (error) {
    console.error('Error writing blob:', error);
    return res.status(500).json({ error: 'Failed to save data' });
  }
}
