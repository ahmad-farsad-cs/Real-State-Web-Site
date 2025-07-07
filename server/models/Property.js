// server/models/Property.js

const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  location: { type: String, required: true },
  image: String,
  bedrooms: Number,
  bathrooms: Number,
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
