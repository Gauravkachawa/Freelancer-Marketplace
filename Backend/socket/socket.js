const Message = require("../models/Message");

const socketHandler = (io) => {

    io.on("connection", (socket) => {

        console.log("User Connected:", socket.id);

        // Join Project Room
        socket.on("joinRoom", (projectId) => {

            socket.join(projectId);

            console.log(`User joined room ${projectId}`);

        });

        // Send Message
        socket.on("sendMessage", async (data) => {

            try {

                const newMessage = await Message.create({

                    project: data.project,

                    sender: data.sender,

                    receiver: data.receiver,

                    message: data.message

                });

                io.to(data.project).emit("receiveMessage", newMessage);

            } catch (error) {

                console.log(error.message);

            }

        });

        socket.on("disconnect", () => {

            console.log("User Disconnected:", socket.id);

        });

    });

};

module.exports = socketHandler;