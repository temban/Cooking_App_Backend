import pg from 'pg';
import 'dotenv/config'; // We still need this here to read the .env file

// Create the reusable database connection pool
const pool = new pg.Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

// Optional: Log a message when a connection is successful
pool.on('connect', () => {
    console.log('PostgreSQL DB pool connected successfully.');
});

// Export the pool so other parts of the app (the Services) can use it
export default pool;