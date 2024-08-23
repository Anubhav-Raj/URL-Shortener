/* eslint-disable no-undef */
const Url = require("../models/Url");
const shortid = require("shortid");
exports.shortenUrl = async (req, res) => {
  try {
    console.log(`Worker add url ${process.pid} is handling request`);

    const { originalUrl } = req.body;
    let shortUrl;
    let isUnique = false;

    // Loop until a unique shortUrl is generated
    while (!isUnique) {
      const shortCode = shortid();
      shortUrl = `${process.env.BASE_URL}api/url/${shortCode}`;

      // Check if the shortUrl already exists in the database
      const existingUrl = await Url.findOne({ shortCode: shortUrl });
      if (!existingUrl) {
        isUnique = true;
      }
    }

    // Create and save the new URL entry
    const url = new Url({
      originalUrl,
      shortCode: shortUrl,
      userid: req.userId,
    });
    await url.save();

    res.status(201).json({ url, message: "Successfully Created Short URL" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.allshortenUrl = async (req, res) => {
  try {
    console.log(`Worker All URL ${process.pid} is handling request`);

    const { userid } = req.body;
    const allurl = await Url.find({ userid: userid });
    console.log(allurl);
    res.status(201).json({ allurl, message: "Sucessfully Created  Short URL" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.deleteurl = async (req, res) => {
  try {
    console.log(`Worker A  Delete Url ${process.pid} is handling request`);

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
    console.log(`Worker A Redirect URL ${process.pid} is handling request`);

    const { shortCode } = req.params;
    const url = await Url.findOneAndUpdate(
      { shortCode: `${process.env.BASE_URL}api/url/${shortCode}` },
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
    console.log(`Worker A Update URL ${process.pid} is handling request`);

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
