// Database connection utility (CommonJS + safe fallback)
const pg = require("pg");

const { Pool } = pg;

let pool;

function hasDatabase() {
  return !!process.env.DATABASE_URL;
}

// Initialize connection pool
function getPool() {
  if (!pool) {
    if (!hasDatabase()) {
      throw new Error("DATABASE_URL not set");
    }

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
    });
  }

  return pool;
}

// Query helper function with graceful fallback
async function query(text, params) {
  if (!hasDatabase()) {
    const err = new Error(
      "Database not configured. Set DATABASE_URL to enable DB queries."
    );
    err.code = "NO_DB";
    throw err;
  }

  const pool = getPool();
  const start = Date.now();

  const res = await pool.query(text, params);
  const duration = Date.now() - start;

  if (process.env.NODE_ENV === "development") {
    console.log("Executed query", { text, duration, rows: res.rowCount });
  }

  return res;
}

// Transaction helper
async function transaction(callback) {
  if (!hasDatabase()) {
    const err = new Error(
      "Database not configured. Set DATABASE_URL to enable DB transactions."
    );
    err.code = "NO_DB";
    throw err;
  }

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
async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

module.exports = { query, transaction, closePool, hasDatabase };
