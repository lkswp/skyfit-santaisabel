import { neon } from '@neondatabase/serverless';

export const SLUGS = new Set(["alan-news", "gisele-grenza", "paola-igarasi", "lucas-lemos", "caio-tanaka"]);
export const TASK = /^(r[1-3]|s[0-3][ab])$/;

let sql, ready;
export async function db() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) throw new Error('Banco não conectado: falta DATABASE_URL na Vercel.');
  if (!sql) sql = neon(url);
  if (!ready) ready = sql`CREATE TABLE IF NOT EXISTS checklist (
    slug text NOT NULL,
    task text NOT NULL,
    done boolean NOT NULL,
    updated_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (slug, task)
  )`;
  await ready;
  return sql;
}
