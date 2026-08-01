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

router.get("/profile", protect, async (req, res) => {

    try{

        const User = require("../models/User");

        const user = await User.findById(req.user.id).select("-password");

        if(!user){

            return res.status(404).json({

                message:"User not found"

            });

        }

        res.json(user);

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

});

router.put("/profile", protect, async (req,res)=>{

    try{

        const User = require("../models/User");

        const user = await User.findById(req.user.id);

        if(!user){

            return res.status(404).json({

                message:"User not found"

            });

        }

        user.name=req.body.name || user.name;

        user.skills=req.body.skills || user.skills;

        user.portfolio=req.body.portfolio || user.portfolio;

       

        await user.save();

        res.json({

            message:"Profile Updated Successfully",

            user

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

});

module.exports = router;