const express = require("express");

const router = express.Router();

const { placeBid,  getProjectBids, acceptBid,  getMyBids } = require("../controllers/bidController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post(
    "/:projectId",
    protect,
    authorizeRoles("freelancer"),
    placeBid
);

router.get(
    "/project/:projectId",
    protect,
    authorizeRoles("client"),
    getProjectBids
);

router.put(

    "/accept/:bidId",

    protect,

    authorizeRoles("client"),

    acceptBid

);

router.get(

    "/my",

    protect,

    authorizeRoles("freelancer"),

    getMyBids

);


module.exports = router;