import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const Pool = pg.Pool;
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + '?sslmode=require'
});
pool.connect((err) => {
    if (err)
        throw new Error(err);
    console.log('Connect to postgreSQL successfully');
});
export default pool;
