const protect = require("../middleware/authMiddleware");

const express = require("express");

console.log("User Routes Loaded");

const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controllers/userController");

router.get("/test", (req, res) => {
    res.send("User Routes Working");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {

    res.json({

        message: "Protected Route Accessed",

        user: req.user

    });

});

module.exports = router;