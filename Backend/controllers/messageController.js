const Message = require("../models/Message");
const Project = require("../models/Project");

// Send Message
const sendMessage = async (req, res) => {

    try {

        const { receiver, message } = req.body;

        const project = await Project.findById(req.params.projectId);

        if (!project) {

            return res.status(404).json({

                message: "Project Not Found"

            });

        }

        const newMessage = await Message.create({

            project: project._id,

            sender: req.user.id,

            receiver,

            message

        });

        res.status(201).json({

            message: "Message Sent Successfully",

            chat: newMessage

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// Get Chat History

const getChatHistory = async (req, res) => {

    try {

        const messages = await Message.find({

            project: req.params.projectId

        })

        .populate("sender", "name email")

        .populate("receiver", "name email")

        .sort({ createdAt: 1 });

        res.status(200).json(messages);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    sendMessage,

    getChatHistory

};