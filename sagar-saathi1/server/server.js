// server/server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());                 // allow requests from your React dev server
app.use(express.json());         // replaces body-parser

app.get('/api/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
