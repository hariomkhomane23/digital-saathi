const express = require("express");

const {
    checkURL,
} = require("../controllers/urlCheckerController");

const router = express.Router();

router.post("/check", checkURL);

module.exports = router;