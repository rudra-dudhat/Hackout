// src/app.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Backend running' });
});

// example API
app.get('/api/warnings', (req, res) => {
  res.json([{ id: 1, type: 'Storm', risk: 45 }]);
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});