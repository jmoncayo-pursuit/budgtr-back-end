const express = require('express');
const cors = require('cors');
const transactionsController = require('./controllers/transactionsController');

const app = express();

app.use(cors());
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes for transactions
app.use('/transactions', transactionsController);

module.exports = app;
