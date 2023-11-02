import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const Pool = pg.Pool;

// const pool = new Pool({
//     user: 'postgres',
//     password: 'root',
//     host: 'localhost',
//     port: 5432,
//     database: 'web_chat_postgres'
// });

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + '?sslmode=require'
});

pool.connect((err: any) => {
    if (err) throw new Error(err);
    console.log('Connect to postgreSQL successfully');
});

export default pool;
