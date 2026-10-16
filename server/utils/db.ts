import pg from 'pg'

const { Pool } = pg

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  ''

let _pool: pg.Pool | null = null

export function isDbConfigured() {
  return Boolean(connectionString)
}

export function getPool(): pg.Pool | null {
  if (!connectionString) return null
  if (!_pool) {
    _pool = new Pool({
      connectionString,
      max: Number(process.env.PG_POOL_MAX || 10),
      ssl:
        process.env.PG_SSL === 'true' ||
        (connectionString.includes('railway') || connectionString.includes('render.com'))
          ? { rejectUnauthorized: false }
          : undefined,
    })
    _pool.on('error', (err) => console.error('[db] pool error', err.message))
  }
  return _pool
}

export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const pool = getPool()
  if (!pool) throw new Error('DATABASE_URL not configured')
  const res = await pool.query(text, params)
  return res.rows as T[]
}

export async function queryOne<T = any>(text: string, params?: any[]): Promise<T | null> {
  const rows = await query<T>(text, params)
  return rows[0] ?? null
}
