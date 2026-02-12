import { createHash } from 'crypto';

const ADMIN_PIN_HASH = '2c52330077a08ea7f0795ff8786dc5c50f160359cbb1c0fe6708ea026cfd34e3';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { pin } = req.body;

  if (!pin) {
    return res.status(400).json({ error: 'Missing pin' });
  }

  const pinHash = createHash('sha256').update(pin).digest('hex');
  const valid = pinHash === ADMIN_PIN_HASH;

  return res.status(200).json({ valid });
}
