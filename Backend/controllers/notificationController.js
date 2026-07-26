const Notification = require("../models/Notification");

// Get Notifications
const getNotifications = async (req, res) => {

    try {

        const notifications = await Notification.find({

            user: req.user.id

        }).sort({

            createdAt: -1

        });

        res.status(200).json(notifications);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Mark Notification as Read
const markAsRead = async (req, res) => {

    try {

        const notification = await Notification.findById(req.params.id);

        if (!notification) {

            return res.status(404).json({

                message: "Notification Not Found"

            });

        }

        notification.isRead = true;

        await notification.save();

        res.status(200).json({

            message: "Notification Marked as Read"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    getNotifications,

    markAsRead

};