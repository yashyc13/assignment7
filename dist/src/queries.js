import pkg from 'pg';
const { Pool } = pkg;
export const pool = new Pool({
    user: 'chahat.chugh',
    host: 'localhost',
    database: 'postgres',
    password: 'Source@123',
    port: 5432,
});
//# sourceMappingURL=queries.js.map