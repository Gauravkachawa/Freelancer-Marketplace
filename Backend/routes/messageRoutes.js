const express = require("express");

const router = express.Router();

const {

    sendMessage,

    getChatHistory

} = require("../controllers/messageController");

const protect = require("../middleware/authMiddleware");

router.post(

    "/:projectId",

    protect,

    sendMessage

);

router.get(

    "/:projectId",

    protect,

    getChatHistory

);

module.exports = router;