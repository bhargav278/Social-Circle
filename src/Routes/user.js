const express = require("express");
const { userAuth } = require("../Middleware/userAuth");
const connectionRequest = require("../Models/connectionRequest");
const userRouter = express.Router();

userRouter.get("/request/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        
        const connectionData =await connectionRequest.find({
            receiverId: loggedInUser._id,
            status : "interested"
        }).populate("senderId", ["firstName", "lastName", "age", "gender", "about", "skills", "profileUrl"])
        
        res.send({ message: "Data fetched successfully", data: connectionData });
    }
    catch (err) {
        res.send("ERROR : " + err.message);
    }
})

module.exports = {userRouter}