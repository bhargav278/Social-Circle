const express = require("express");
const requestRouter = express.Router();
const connectionRequest = require("../Models/connectionRequest");
const { userAuth } = require("../Middleware/userAuth");
const User = require("../Models/User");

requestRouter.post("/send/:status/:userId", userAuth, async (req, res) => {
    try {
        const user = req.user;
        let senderId = user.id;
        let receiverId = req.params.userId;
        let status = req.params.status;

        const connectionExist = await connectionRequest.findOne({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        })

        if (connectionExist) {
            throw new Error("request already sent");
        }

        const AllowedStatus = ["ignored", "interested"];
        if (!AllowedStatus.includes(status)) {
            throw new Error("Invalid Status!");
        }

        const receiverExist = await User.findById(receiverId);
        if (!receiverExist) {
            throw new Error("Receiver does not exist!");
        }
        const requestData = new connectionRequest({
            senderId, receiverId, status
        })
        const data = await requestData.save()
        res.json({ data, message: "request send successfully" });
    }
    catch (err) {
        res.send("ERROR : " + err.message);
    }
})

requestRouter.post("/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const AlloweStatus = ["accepted", "rejected"];
        if (!AlloweStatus.includes(status)) {
            throw new Error("Invalid Status!");
        }

        const checkRequestId = await connectionRequest.findOne({
            _id: requestId,
            receiverId: loggedInUser,
            status: "interested",
        })
        console.log(checkRequestId);
        if (!checkRequestId) {
            throw new Error("No Request Found!");
        }
        checkRequestId.status = status;
        const data = await checkRequestId.save();
        res.json({ data, message: "successfull" });
    }
    catch (err) {
        res.send("ERROR : " + err.message);
    }
})

module.exports = { requestRouter }