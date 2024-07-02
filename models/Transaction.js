// back-end/models/Transaction.js
const fs = require('fs');
const path = require('path');
const transactionsPath = path.resolve(__dirname, '../data/transactions.json');

// Helper function to read transactions from file
function readTransactions() {
  try {
    const transactionsData = fs.readFileSync(transactionsPath, 'utf8');
    return JSON.parse(transactionsData);
  } catch (error) {
    return [];
  }
}

// Helper function to write transactions to file
function writeTransactions(transactions) {
  fs.writeFileSync(
    transactionsPath,
    JSON.stringify(transactions, null, 2),
    'utf8'
  );
}

// Get all transactions
function getAllTransactions() {
  return readTransactions();
}

// Get a single transaction by ID
function getTransaction(id) {
  const transactions = readTransactions();
  return transactions.find((transaction) => transaction.id === id);
}

// Create a new transaction
function createTransaction(newTransaction) {
  const transactions = readTransactions();
  const nextId =
    transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1;
  newTransaction.id = nextId;
  transactions.push(newTransaction);
  writeTransactions(transactions);
  return newTransaction;
}

// Update a transaction
function updateTransaction(updatedTransaction) {
  const transactions = readTransactions();
  const index = transactions.findIndex(
    (transaction) => transaction.id === updatedTransaction.id
  );
  if (index !== -1) {
    transactions[index] = updatedTransaction;
    writeTransactions(transactions);
    return updatedTransaction;
  }
  return null;
}

// Delete a transaction
function deleteTransaction(id) {
  const transactions = readTransactions();
  const index = transactions.findIndex((transaction) => transaction.id === id);
  if (index !== -1) {
    const deletedTransaction = transactions.splice(index, 1)[0];
    writeTransactions(transactions);
    return deletedTransaction;
  }
  return null;
}

module.exports = {
  getAllTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
