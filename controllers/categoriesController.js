const express = require('express');
const categoriesController = express.Router();
const fs = require('fs');
const path = require('path');
const categoriesPath = path.resolve(__dirname, '../data/categories.json');

// Helper functions for reading/writing categories
function readCategories() {
  try {
    const categoriesData = fs.readFileSync(categoriesPath, 'utf8');
    return JSON.parse(categoriesData);
  } catch (error) {
    return []; // Return an empty array if the file doesn't exist or there's an error
  }
}

function writeCategories(categories) {
  fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2), 'utf8');
}

// GET all categories
categoriesController.get('/', (req, res) => {
  try {
    const categories = readCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new category
categoriesController.post('/', (req, res) => {
  try {
    const newCategory = req.body.category;
    if (!newCategory) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const categories = readCategories();
    if (categories.includes(newCategory)) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    categories.push(newCategory);
    writeCategories(categories);
    res.status(201).json({ message: 'Category created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (update) a category
categoriesController.put('/:category', (req, res) => {
  try {
    const categoryToUpdate = req.params.category;
    const newCategoryName = req.body.category;
    if (!newCategoryName) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const categories = readCategories();
    const index = categories.indexOf(categoryToUpdate);
    if (index === -1) {
      return res.status(404).json({ error: 'Category not found' });
    }

    categories[index] = newCategoryName;
    writeCategories(categories);
    res.json({ message: 'Category updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a category
categoriesController.delete('/:category', (req, res) => {
  try {
    const categoryToDelete = req.params.category;

    const categories = readCategories();
    const index = categories.indexOf(categoryToDelete);
    if (index === -1) {
      return res.status(404).json({ error: 'Category not found' });
    }

    categories.splice(index, 1);
    writeCategories(categories);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = categoriesController;
