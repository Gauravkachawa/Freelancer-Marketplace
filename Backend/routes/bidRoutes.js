const express = require("express");

const router = express.Router();

const { placeBid } = require("../controllers/bidController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post(
    "/:projectId",
    protect,
    authorizeRoles("freelancer"),
    placeBid
);

module.exports = router;