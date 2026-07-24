const express = require("express");

const router = express.Router();

const { addReview } = require("../controllers/reviewController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post(

    "/:projectId",

    protect,

    authorizeRoles("client"),

    addReview

);

module.exports = router;