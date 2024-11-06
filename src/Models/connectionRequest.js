const mongoose = require('mongoose');
const { Schema } = mongoose;

const connectionRequest = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    status: {
        type: String,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message : `{VALUE} IS NOT VALID STATUS`
        }
    }
}, { timestamps: true })

connectionRequest.pre('save', function(next) {
    const user = this;
    if (user.senderId.equals(user.receiverId)) {
        throw new Error("Can't send connection request to self");
    }
    next();
})

const connectionRequestModel = mongoose.model("connectionRequest", connectionRequest);

module.exports = connectionRequestModel;