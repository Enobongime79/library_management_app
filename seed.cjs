const pool = require("./db/database");
const bcrypt = require('bcrypt');

const email = 'admin@library.com';
const password = 'admin12345';

async function seed() {
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
}

seed();
