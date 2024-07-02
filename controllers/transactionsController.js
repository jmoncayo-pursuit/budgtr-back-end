// back-end/controllers/transactionsController.js
const express = require('express');
const transactions = express.Router();
const {
  getAllTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../models/Transaction');

// Get all transactions
transactions.get('/', (req, res) => {
  try {
    const allTransactions = getAllTransactions();
    res.json(allTransactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single transaction by ID
transactions.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const transaction = getTransaction(id);
    if (!transaction) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new transaction
transactions.post('/', (req, res) => {
  try {
    const { item_name, amount, date, from, category } = req.body;
    if (!item_name || !amount || !date || !from || !category) {
      res.status(400).json({ error: 'Please provide all required fields' });
      return;
    }
    const newTransaction = createTransaction({
      item_name,
      amount,
      date,
      from,
      category,
    });
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a transaction
transactions.put('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { item_name, amount, date, from, category } = req.body;
    if (!item_name || !amount || !date || !from || !category) {
      res.status(400).json({ error: 'Please provide all required fields' });
      return;
    }
    const updatedTransaction = updateTransaction({
      id,
      item_name,
      amount,
      date,
      from,
      category,
    });
    if (!updatedTransaction) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }
    res.json(updatedTransaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a transaction
transactions.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedTransaction = deleteTransaction(id);
    if (!deletedTransaction) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = transactions;
