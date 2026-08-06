const express = require("express");

const passport = require("passport");

const jwt = require("jsonwebtoken");

const router = express.Router();

router.get(

    "/google",

    passport.authenticate("google", {

        scope: ["profile", "email"]

    })

);

router.get(

    "/google/callback",

    passport.authenticate("google", {

        session: false,

        failureRedirect: "/login"

    }),

    (req, res) => {

        const token = jwt.sign(

            {

                id: req.user._id,

                role: req.user.role

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d"

            }

        );

        const userData = encodeURIComponent(

            JSON.stringify({

                id: req.user._id,

                name: req.user.name,

                email: req.user.email,

                role: req.user.role,

                profileImage: req.user.profileImage

            })

        );

        res.redirect(

            `http://127.0.0.1:5500/Frontend/login-success.html?token=${token}&user=${userData}`

        );

    }

);

module.exports = router;