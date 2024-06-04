const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: {
    type: string,
    required: true
  },
  changes: {
    type: Array,
    required: true
  },
  createdBy: String,
}, { timestamps: true });

module.exports = mongoose.model('Branch', branchSchema);