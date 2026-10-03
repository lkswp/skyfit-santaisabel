import { timingSafeEqual } from 'node:crypto';
import { db } from './_lib.js';

function same(a, b) {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const senha = process.env.PAINEL_SENHA;
  if (!senha) return res.status(500).json({ error: 'Falta configurar PAINEL_SENHA na Vercel.' });
  if (!same(req.headers['x-painel-senha'] || '', senha)) return res.status(401).json({ error: 'Senha errada.' });
  try {
    const sql = await db();
    const rows = await sql`SELECT slug, task, done, updated_at FROM checklist ORDER BY slug, task`;
    return res.status(200).json({ rows });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
