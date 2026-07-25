const projectRoutes = require("./routes/projectRoutes");
const http = require("http");
const { Server } = require("socket.io");
const express = require("express");  // I am using this so that i can create api or start the server
const bidRoutes = require("./routes/bidRoutes");
const messageRoutes = require("./routes/messageRoutes");
const socketHandler = require("./socket/socket");

require("dotenv").config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

connectDB();

const reviewRoutes = require("./routes/reviewRoutes");



const app = express();    //creating express application object
const server = http.createServer(app);
const io = new Server(server, {

    cors: {

        origin: "*"

    }

});
socketHandler(io);

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
console.log("User routes mounted");
app.use("/api/bids", bidRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/messages", messageRoutes);


const PORT = process.env.PORT || 5000;      // for telling to our server to run on which port

app.get("/" , (req, res) =>{
    res.send("Freelancer Marketplace Backend is Running...")    //For creating the route  //when someone visits thse server will send this
})




server.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)      //This will start the server and listen for incoming requests
})