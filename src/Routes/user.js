const express = require("express");
const { userAuth } = require("../Middleware/userAuth");
const connectionRequest = require("../Models/connectionRequest");
const User = require("../Models/User");
const userRouter = express.Router();

userRouter.get("/request/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionData = await connectionRequest.find({
            receiverId: loggedInUser._id,
            status: "interested"
        }).populate("senderId", ["firstName", "lastName", "age", "gender", "about", "skills", "profileUrl"])

        res.send({ message: "Data fetched successfully", data: connectionData });
    }
    catch (err) {
        res.send("ERROR : " + err.message);
    }
})

userRouter.get("/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connections = await connectionRequest.find({
            $or: [
                { senderId: loggedInUser._id, status: "accepted" },
                { receiverId: loggedInUser._id, status: "accepted" }
            ]
        })
            .populate("senderId", ["firstName", "secondName", "age", "skills", "gender", "about", "profileUrl"])
            .populate("receiverId", ["firstName", "lastName", "age", "skills", "gender", "about", "profileUrl"]);

        const data = connections.map(connection => {
            if (connection.senderId._id.equals(loggedInUser._id)) {
                return connection.receiverId;
            }
            return connection.senderId;
        })

        res.json({ message: "All connections", data });
    }
    catch (err) {
        res.send("ERROR : " + err.message);
    }

})

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        let pages = req.query.page || 1;
        let limit = req.query.limit || 10;
        limit = (limit > 50) ? 50 : limit;
        let skip = (pages - 1) * limit;

        const connections = await connectionRequest.find({
            $or: [
                { senderId: loggedInUser._id },
                { receiverId: loggedInUser._id }
            ]
        })

        const connectedUsers = connections.map(connection => {
            if (connection.senderId.equals(loggedInUser._id)) {
                return connection.receiverId;
            }
            return connection.senderId;
        })

        //in sort below commented code
        const noConnectionUser = await User.find({
            $and: [
                { _id: { $nin: connectedUsers } },
                { _id: { $ne: loggedInUser._id } },
            ]
        }).skip(skip).limit(limit);

        // const noConnectionUser = allUsers.filter((user) => {
        //     const isPresent = connectedUsers.some(id => id.equals(user._id));
        //     if (!user._id.equals(loggedInUser._id) && !isPresent) {
        //         return user._id;
        //     }
        // })
        const data = noConnectionUser.map((user)=> user.firstName)
        res.json({message:"suggested users" , data});
    }
    catch (err) {
        res.send("ERROR : " + err.message);
    }
})

module.exports = { userRouter }