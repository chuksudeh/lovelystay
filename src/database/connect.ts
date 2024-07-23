import pgPromise from 'pg-promise';
import dotenv from 'dotenv';
dotenv.config();

const initOptions = {};
const pgp = pgPromise(initOptions);

const connection = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Use true if you have a valid SSL certificate
    },
};

const db = pgp(connection);

export default db;
