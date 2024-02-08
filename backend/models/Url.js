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
  clicks: [
    {
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
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
