import pg from 'pg';
const Pool = pg.Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'web_chat_postgres'
});

export default pool;
