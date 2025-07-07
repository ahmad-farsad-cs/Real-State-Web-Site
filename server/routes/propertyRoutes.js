// server/routes/propertyRoutes.js

const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const protect = require('../middleware/authMiddleware');
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');

router.get('/', getAllProperties);
router.get('/:id', getPropertyById);        // ✅ Keep this only
router.post('/', protect, createProperty);
router.put('/:id', protect, updateProperty);
router.delete('/:id', protect, deleteProperty);

module.exports = router;
