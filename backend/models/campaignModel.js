const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'completed'],
  },
  applications: {
    type: Number,
    default: 0,
  },
  deadline: {
    type: Date,
    required: true,
  },
  brandId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
