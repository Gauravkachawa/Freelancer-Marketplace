const User = require("../models/User");

// Upload Profile Image
const uploadProfileImage = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                message: "User Not Found"
            });

        }

        user.profileImage = req.file.path;

        await user.save();

        res.status(200).json({

            message: "Profile Image Uploaded Successfully",

            profileImage: user.profileImage

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Upload Portfolio Files
const uploadPortfolio = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                message: "User Not Found"
            });

        }

        const files = req.files.map(file => file.path);

        user.portfolio.push(...files);

        await user.save();

        res.status(200).json({

            message: "Portfolio Uploaded Successfully",

            portfolio: user.portfolio

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    uploadProfileImage,
    uploadPortfolio

};