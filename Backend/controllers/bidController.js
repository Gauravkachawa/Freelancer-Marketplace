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

module.exports = {
    placeBid
};