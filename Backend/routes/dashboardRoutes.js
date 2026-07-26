const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const {
    clientDashboard,
    freelancerDashboard
} = require("../controllers/dashboardController");

// Client Dashboard
router.get(
    "/client",
    protect,
    authorizeRoles("client"),
    clientDashboard
);

// Freelancer Dashboard
router.get(
    "/freelancer",
    protect,
    authorizeRoles("freelancer"),
    freelancerDashboard
);

module.exports = router;