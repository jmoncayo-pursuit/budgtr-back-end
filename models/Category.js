// models/Category.js
const fs = require('fs');
const path = require('path');
const categoriesPath = path.resolve(__dirname, '../data/categories.json');

// Helper function to read categories from file
function readCategories() {
  try {
    const categoriesData = fs.readFileSync(categoriesPath, 'utf8');
    // Parse the JSON data correctly
    const categories = JSON.parse(categoriesData);
    return categories;
  } catch (error) {
    // If file doesn't exist, return initial categories
    return [
      'Income',
      'Food',
      'Rent',
      'Utilities',
      'Entertainment',
      'Savings',
      'Travel',
      'Luxury',
      'Ops',
      'Brand New',
    ];
  }
}

// Helper function to write categories to file
function writeCategories(categories) {
  fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2), 'utf8');
}

// Get all categories
function getAllCategories() {
  return readCategories();
}

// Create a new category
function createCategory(newCategory) {
  const categories = readCategories();
  categories.push({ category: newCategory });
  writeCategories(categories);
  return { category: newCategory };
}

module.exports = {
  getAllCategories,
  createCategory,
};
