const express = require('express');
const cors = require('cors');
const transactionsController = require('./controllers/transactionsController');
const categoriesController = require('./controllers/categoriesController');

const app = express();

app.use(cors());
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes for transactions
app.use('/transactions', transactionsController);

// Routes for categories
app.use('/categories', categoriesController);

// Catch-all route for non-existent routes
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Export the app object
module.exports = app;
