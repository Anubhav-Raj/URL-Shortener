/* eslint-disable no-undef */
const Url = require("../models/Url");
const shortid = require("shortid");
exports.shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const shortCode = shortid();
    const shortUrl = `${process.env.BASE_URL}/api/url/${shortCode}`;
    const url = new Url({
      originalUrl,
      shortCode: shortUrl,
      userid: req.userId,
    });
    await url.save();
    res.status(201).json({ url, message: "Sucessfully Created  Short URL" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.allshortenUrl = async (req, res) => {
  try {
    const { userid } = req.body;
    const allurl = await Url.find({ userid: userid });
    res.status(201).json({ allurl, message: "Sucessfully Created  Short URL" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.deleteurl = async (req, res) => {
  try {
    const { id } = req.body;
    const response = await Url.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).json({ message: "Short URL not found" });
    }
    res.status(200).json({ message: "Successfully deleted Short URL" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOneAndUpdate(
      { shortCode: `${process.env.BASE_URL}/api/url/${shortCode}` },
      { $push: { clicks: { timestamp: Date.now() } } },
      { new: true }
    );
    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }
    res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateUrl = async (req, res) => {
  try {
    const { id, updateUrl } = req.body;

    const url = await Url.findByIdAndUpdate(
      id,
      { originalUrl: updateUrl },
      { new: true }
    );

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.json({ message: "URL updated successfully", updatedUrl: url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
