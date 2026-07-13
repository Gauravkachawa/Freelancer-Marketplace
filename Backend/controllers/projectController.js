const Project = require("../models/Project");

// Create New Project
const createProject = async (req, res) => {

    try {

        const {
            title,
            description,
            budget,
            category,
            skills,
            deadline
        } = req.body;

        const project = await Project.create({

            title,
            description,
            budget,
            category,
            skills,
            deadline,

            client: req.user.id

        });

        res.status(201).json({

            message: "Project Created Successfully",

            project

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Get All Projects
const getAllProjects = async (req, res) => {

    try {

        const projects = await Project.find()
            .populate("client", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({

            count: projects.length,

            projects

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Get Single Project
const getProjectById = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id)
            .populate("client", "name email");

        if (!project) {

            return res.status(404).json({
                message: "Project Not Found"
            });

        }

        res.status(200).json(project);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {

    createProject,
    getAllProjects,
    getProjectById

};