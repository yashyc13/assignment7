import pkg from 'pg';
const { Pool } = pkg;
export const pool = new Pool({
    user: "postgres",
    database: "assignment7",
    password: "admin",
    host: "localhost",
    port: 5432
});
//# sourceMappingURL=db.js.map