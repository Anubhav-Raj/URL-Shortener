/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  clickDetails: [
    {
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  status: {
    type: String,
    default: "active",
    enum: ["active", "inactive"],
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Url = mongoose.model("Url", UrlSchema);

module.exports = Url;
