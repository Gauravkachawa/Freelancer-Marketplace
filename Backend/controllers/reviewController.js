const Review = require("../models/Review");
const Project = require("../models/Project");
const User = require("../models/User");

// Add Review
const addReview = async (req, res) => {

    try {

        const { rating, review } = req.body;

        // Find Project
        const project = await Project.findById(req.params.projectId);

        if (!project) {

            return res.status(404).json({

                message: "Project Not Found"

            });

        }

        // Only Client can review
        if (project.client.toString() !== req.user.id) {

            return res.status(403).json({

                message: "Not Authorized"

            });

        }

        // Project must be completed
        if (project.status !== "Completed") {

            return res.status(400).json({

                message: "Project is not completed"

            });

        }

        // Prevent duplicate review
        const existingReview = await Review.findOne({

            project: project._id,

            client: req.user.id

        });

        if (existingReview) {

            return res.status(400).json({

                message: "Review already submitted"

            });

        }

        // Create Review
        const newReview = await Review.create({

            project: project._id,

            client: req.user.id,

            freelancer: project.assignedFreelancer,

            rating,

            review

        });

        // Calculate Average Rating
        const reviews = await Review.find({

            freelancer: project.assignedFreelancer

        });

        const totalRating = reviews.reduce(

            (sum, item) => sum + item.rating,

            0

        );

        const averageRating = totalRating / reviews.length;

        // Update Freelancer Rating
        await User.findByIdAndUpdate(

            project.assignedFreelancer,

            {

                rating: averageRating

            }

        );

        res.status(201).json({

            message: "Review Added Successfully",

            review: newReview,

            averageRating

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    addReview

};