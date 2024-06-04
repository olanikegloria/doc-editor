const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: Object,
    required: true
  },
  mainBranch: {
    type: String,
    required: true,
    default: 'main'
  },
  branches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
  }],

}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);