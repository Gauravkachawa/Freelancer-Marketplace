const Bid = require("../models/Bid");
const Project = require("../models/Project");

// Place a Bid
const placeBid = async (req, res) => {

    try {

        const { amount, proposal, deliveryTime } = req.body;

        // Check if project exists
        const project = await Project.findById(req.params.projectId);

        if (!project) {

            return res.status(404).json({
                message: "Project Not Found"
            });

        }

        // Only Open projects can receive bids
        if (project.status !== "Open") {

            return res.status(400).json({
                message: "This project is not accepting bids"
            });

        }

        // Check if freelancer has already placed a bid
        const existingBid = await Bid.findOne({

            project: req.params.projectId,

            freelancer: req.user.id

        });

        if (existingBid) {

            return res.status(400).json({

                message: "You have already placed a bid on this project"

            });

        }

        // Create Bid
        const bid = await Bid.create({

            project: req.params.projectId,

            freelancer: req.user.id,

            amount,

            proposal,

            deliveryTime

        });

        res.status(201).json({

            message: "Bid Placed Successfully",

            bid

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// Get All Bids for a Project
const getProjectBids = async (req, res) => {

    try {

        // Find Project
        const project = await Project.findById(req.params.projectId);

        if (!project) {

            return res.status(404).json({
                message: "Project Not Found"
            });

        }

        // Only Project Owner can view bids
        if (project.client.toString() !== req.user.id) {

            return res.status(403).json({
                message: "You are not authorized to view these bids"
            });

        }

        // Fetch all bids
        const bids = await Bid.find({

            project: req.params.projectId

        })

        .populate("freelancer", "name email profileImage")

        .sort({ createdAt: -1 });

        res.status(200).json({

            message: "Bids Retrieved Successfully",

            totalBids: bids.length,

            bids

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Accept a Bid
const acceptBid = async (req, res) => {

    try {

        // Find Bid
        const bid = await Bid.findById(req.params.bidId);

        if (!bid) {

            return res.status(404).json({
                message: "Bid Not Found"
            });

        }

        // Find Project
        const project = await Project.findById(bid.project);

        if (!project) {

            return res.status(404).json({
                message: "Project Not Found"
            });

        }

        // Only Project Owner can accept bids
        if (project.client.toString() !== req.user.id) {

            return res.status(403).json({
                message: "You are not authorized to accept this bid"
            });

        }

        // Accept Selected Bid
        bid.status = "Accepted";

        await bid.save();

        // Reject Remaining Bids
        await Bid.updateMany(

            {

                project: project._id,

                _id: { $ne: bid._id }

            },

            {

                status: "Rejected"

            }

        );

        // Assign Freelancer
        project.assignedFreelancer = bid.freelancer;

        // Update Project Status
        project.status = "In Progress";

        await project.save();

        res.status(200).json({

            message: "Bid Accepted Successfully",

            acceptedBid: bid,

            project

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Get My Bids
const getMyBids = async (req, res) => {

    try {

        const bids = await Bid.find({

            freelancer: req.user.id

        })

        .populate("project", "title budget category status deadline")

        .sort({ createdAt: -1 });

        res.status(200).json({

            message: "My Bids Retrieved Successfully",

            totalBids: bids.length,

            bids

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {
    placeBid,
    getProjectBids,
    acceptBid,
    getMyBids
};