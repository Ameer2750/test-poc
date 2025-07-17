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

app.post('/send', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: 'All fields are required.' });

  try {
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(query, [name, email, hashedPassword]);

    res.status(201).json({ message: 'User created', user: result.rows[0] });
  } catch (err) {
    console.error('DB Error:', err);

    // Example: duplicate email
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email already exists.' });
    }

    // Example: bad input
    if (err.code === '22P02') {
      return res.status(400).json({ error: 'Invalid input format.' });
    }

    // Fallback
    return res.status(500).json({ error: err.message || 'Unexpected database error.' });
  }
});


app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
