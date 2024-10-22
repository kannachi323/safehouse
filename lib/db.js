// lib/db.js
import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  user: 'db_user',
  password: 'password',
  database: 'rentallistings',
  port: 5432,
});

export default pool;
