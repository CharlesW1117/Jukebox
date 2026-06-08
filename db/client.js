import pg from "pg";

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL || "postgres://localhost/jukebox",
});

export default db;
