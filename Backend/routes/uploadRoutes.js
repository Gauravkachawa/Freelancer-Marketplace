const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const {

    uploadProfileImage,
    uploadPortfolio

} = require("../controllers/uploadController");

router.post(

    "/profile",

    protect,

    upload.single("profileImage"),

    uploadProfileImage

);

router.post(

    "/portfolio",

    protect,

    upload.array("portfolio", 5),

    uploadPortfolio

);

module.exports = router;