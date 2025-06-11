const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema(
  {
    shortHash: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    longUrl: {
      type: String,
      trim: true,
      required: true,
    },
    clickCount: {
      type: Number,
      default: 0,
    },
    maxClicks: {
      type: Number,
      default: 1, 
    },
    used: {
      type: Boolean,
      default: false,
    },
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
       required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Url', urlSchema);
