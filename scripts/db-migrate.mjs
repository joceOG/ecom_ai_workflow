import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import pg from 'pg'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.error('DATABASE_URL manquant. Ex: export DATABASE_URL=postgres://kidishop:kidishop@localhost:5432/kidishop')
  process.exit(1)
}
const mode = process.argv[2] || 'all' // schema | seed | all
const client = new pg.Client({
  connectionString,
  ssl: process.env.PG_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
})

await client.connect()
if (mode === 'schema' || mode === 'all') {
  const schema = await readFile(join(root, 'server/db/schema.sql'), 'utf8')
  await client.query(schema)
  console.log('[db] schema OK')
}
if (mode === 'seed' || mode === 'all') {
  const seed = await readFile(join(root, 'server/db/seed.sql'), 'utf8')
  await client.query(seed)
  console.log('[db] seed OK')
}
await client.end()
console.log('[db] done:', mode)
