require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require("../Models/User")

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Please Sign in");
        }
        const decoded =await jwt.verify(token, process.env.SECRET_CODE);
        const {id} = decoded;
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found!");
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.send("Error : " + err.message);
    }
}
module.exports = {userAuth};