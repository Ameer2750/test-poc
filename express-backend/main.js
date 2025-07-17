const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors()); // Allow all origins
app.use(express.json()); // Parse JSON body

// PostgreSQL pool
const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

// Send API
// app.post('/send', async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password)
//     return res.status(400).json({ error: 'All fields required' });

//   try {
//     const query = `
//       INSERT INTO users (name, email, password)
//       VALUES ($1, $2, $3) RETURNING *;
//     `;
//     const result = await pool.query(query, [name, email, password]);

//     res.status(201).json({ message: 'User created', user: result.rows[0] });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Database error' });
//   }
// });

// app.post('/send', async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password)
//     return res.status(400).json({ error: 'All fields are required.' });

//   try {
//     const query = `
//       INSERT INTO users (name, email, password)
//       VALUES ($1, $2, $3) RETURNING *;
//     `;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const result = await pool.query(query, [name, email, hashedPassword]);

//     res.status(201).json({ message: 'User created', user: result.rows[0] });
//   } catch (err) {
//     console.error('DB Error:', err);

//     // Example: duplicate email
//     if (err.code === '23505') {
//       return res.status(409).json({ error: 'Email already exists.' });
//     }

//     // Example: bad input
//     if (err.code === '22P02') {
//       return res.status(400).json({ error: 'Invalid input format.' });
//     }

//     // Fallback
//     return res.status(500).json({ error: err.message || 'Unexpected database error.' });
//   }
// });

//////////////////////////////////////////////////////
// ✅ SIGNUP API
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'All fields are required.' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const result = await pool.query(query, [name, email, hashedPassword]);
    res.status(201).json({ message: 'User created', user: result.rows[0] });
  } catch (err) {
    console.error('DB Error:', err);
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email already exists.' });
    }
    return res.status(500).json({ error: 'Unexpected database error.' });
  }
});


//////////////////////////////////////////////////////
// ✅ LOGIN API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required.' });

  try {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0)
      return res.status(404).json({ error: 'User not found.' });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials.' });

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Unexpected error during login.' });
  }
});

//////////////////////////////////////////////////////
// ✅ GET ALL HEALTH CHECK PACKAGES
app.get('/health-checks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM health_check_packages');
    res.status(200).json({ packages: result.rows });
  } catch (err) {
    console.error('Health Check Fetch Error:', err);
    res.status(500).json({ error: 'Failed to fetch health checks.' });
  }
});


//////////////////////////////////////////////////////
// ✅ SERVER START
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
