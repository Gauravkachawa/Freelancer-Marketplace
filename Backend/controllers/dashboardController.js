const Project = require("../models/Project");
const Bid = require("../models/Bid");
const Review = require("../models/Review");

// Client Dashboard
const clientDashboard = async (req, res) => {

    try {

        const totalProjects = await Project.countDocuments({
            client: req.user.id
        });

        const openProjects = await Project.countDocuments({
            client: req.user.id,
            status: "Open"
        });

        const completedProjects = await Project.countDocuments({
            client: req.user.id,
            status: "Completed"
        });

        res.status(200).json({

            totalProjects,

            openProjects,

            completedProjects

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Freelancer Dashboard

const freelancerDashboard = async (req, res) => {

    try {

        const totalBids = await Bid.countDocuments({

            freelancer: req.user.id

        });

        const acceptedBids = await Bid.countDocuments({

            freelancer: req.user.id,

            status: "Accepted"

        });

        const totalReviews = await Review.countDocuments({

            freelancer: req.user.id

        });

        res.status(200).json({

            totalBids,

            acceptedBids,

            totalReviews

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    clientDashboard,

    freelancerDashboard

};