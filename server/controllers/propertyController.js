// server/controllers/propertyController.js

const Property = require('../models/Property');

// GET all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('agent', 'name email');
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET one property
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('agent', 'name email');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create property (agent only)
exports.createProperty = async (req, res) => {
  try {
    const property = new Property({
      ...req.body,
      agent: req.user.userId
    });
    const saved = await property.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update property (agent only)
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    // Check if agent owns the property
    if (property.agent.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this property' });
    }

    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE property (agent only)
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    if (property.agent.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this property' });
    }

    await property.remove();
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
