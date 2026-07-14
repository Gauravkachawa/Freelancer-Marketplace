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

// Update Project
const updateProject = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (!project) {

            return res.status(404).json({
                message: "Project Not Found"
            });

        }

        // Check if logged-in user is the owner
        if (project.client.toString() !== req.user.id) {

            return res.status(403).json({
                message: "You are not authorized to update this project"
            });

        }

        const updatedProject = await Project.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                returnDocument: "after",
                runValidators: true
            }

        ).populate("client", "name email");

        res.status(200).json({

            message: "Project Updated Successfully",

            project: updatedProject

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete Project
const deleteProject = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (!project) {

            return res.status(404).json({
                message: "Project Not Found"
            });

        }

        // Check if logged-in user is the owner
        if (project.client.toString() !== req.user.id) {

            return res.status(403).json({
                message: "You are not authorized to delete this project"
            });

        }

        await Project.findByIdAndDelete(req.params.id);

        res.status(200).json({

            message: "Project Deleted Successfully"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject       

};