import { neon } from '@neondatabase/serverless';

// Criadores que já passaram pelo time (o painel de meses antigos continua lendo).
export const SLUGS = new Set(['alan-news', 'gisele-grenza', 'paola-igarasi', 'vitoria-duarte', 'caio-tanaka', 'lucas-lemos']);
export const TASK = /^(r[1-3]|s[0-4][ab])$/;
export const MES = /^20\d\d-(0[1-9]|1[0-2])$/;

let sql, ready;
export async function db() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) throw new Error('Banco não conectado: falta DATABASE_URL na Vercel.');
  if (!sql) sql = neon(url);
  // Uma linha por (mês, criador, tarefa). Cada mês começa zerado.
  if (!ready) ready = sql`CREATE TABLE IF NOT EXISTS checklist_mes (
    mes text NOT NULL,
    slug text NOT NULL,
    task text NOT NULL,
    done boolean NOT NULL,
    updated_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (mes, slug, task)
  )`;
  await ready;
  return sql;
}
