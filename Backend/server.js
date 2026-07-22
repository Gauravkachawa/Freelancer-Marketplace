const projectRoutes = require("./routes/projectRoutes");
const express = require("express");  // I am using this so that i can create api or start the server
const bidRoutes = require("./routes/bidRoutes");

require("dotenv").config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

connectDB();




const app = express();    //creating express application object

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
console.log("User routes mounted");
app.use("/api/bids", bidRoutes);


const PORT = process.env.PORT || 5000;      // for telling to our server to run on which port

app.get("/" , (req, res) =>{
    res.send("Freelancer Marketplace Backend is Running...")    //For creating the route  //when someone visits thse server will send this
})

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)      //This will start the server and listen for incoming requests
})