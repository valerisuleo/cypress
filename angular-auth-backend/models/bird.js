const mongoose = require('mongoose');

const birdSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  latinName: { type: String, required: true, unique: true },
  family: { type: String, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Bird', birdSchema);