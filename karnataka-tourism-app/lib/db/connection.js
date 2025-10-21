// Database connection utility
import pg from "pg";

const { Pool } = pg;

let pool;

// Initialize connection pool
function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // Error handling
    pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
      process.exit(-1);
    });
  }

  return pool;
}

// Query helper function
export async function query(text, params) {
  const pool = getPool();
  const start = Date.now();

  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;

    if (process.env.NODE_ENV === "development") {
      console.log("Executed query", { text, duration, rows: res.rowCount });
    }

    return res;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

// Transaction helper
export async function transaction(callback) {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

// Close pool (for graceful shutdown)
export async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

export default { query, transaction, closePool };
