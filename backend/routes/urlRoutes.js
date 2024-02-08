/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const urlController = require("../controllers/urlController");

router.post("/shorten", authMiddleware.verifyToken, urlController.shortenUrl);
router.post("/allurl", authMiddleware.verifyToken, urlController.allshortenUrl);
router.get("/:shortCode", urlController.redirectUrl);
router.post("/deleteurl", authMiddleware.verifyToken, urlController.deleteurl);
router.post("/updateUrl", authMiddleware.verifyToken, urlController.updateUrl);

module.exports = router;
