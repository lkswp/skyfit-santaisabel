import { db, SLUGS, TASK, MES } from './_lib.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (req.method === 'GET') {
      const slug = String(req.query.slug || ''), mes = String(req.query.mes || '');
      if (!SLUGS.has(slug) || !MES.test(mes)) return res.status(400).json({ error: 'Dados inválidos.' });
      const sql = await db();
      const rows = await sql`SELECT task, done FROM checklist_mes WHERE mes = ${mes} AND slug = ${slug}`;
      const tasks = {};
      for (const r of rows) tasks[r.task] = r.done;
      return res.status(200).json({ tasks });
    }
    if (req.method === 'POST') {
      const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const mes = String(b.mes || ''), slug = String(b.slug || ''), task = String(b.task || ''), done = b.done === true;
      if (!MES.test(mes) || !SLUGS.has(slug) || !TASK.test(task)) return res.status(400).json({ error: 'Dados inválidos.' });
      const sql = await db();
      await sql`INSERT INTO checklist_mes (mes, slug, task, done, updated_at) VALUES (${mes}, ${slug}, ${task}, ${done}, now())
                ON CONFLICT (mes, slug, task) DO UPDATE SET done = EXCLUDED.done, updated_at = now()`;
      return res.status(200).json({ ok: true });
    }
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Método não permitido.' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
