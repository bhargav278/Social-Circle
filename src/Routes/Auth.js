const express = require("express");
const authRouter = express.Router();

const {signUpDataValidation} = require("../utils/validation");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
// const argon2 = require('argon2');
const bcrypt = require('bcrypt');

authRouter.post("/signup", async (req, res) => {
    try {
        signUpDataValidation(req);
        const { firstName, lastName, emailId, password, age, gender, about, profileUrl, skills } = req.body;
        // const encryptedPassword = await argon2.hash(password);
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: encryptedPassword,
            age,
            gender,
            about,
            profileUrl,
            skills
        });
        await user.save();
        res.send("Data saved succesfully");
    }
    catch (err) {
        res.send("ERROR : " + err.message);
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credential");
        }
        else {
            const checkPassword = await bcrypt.compare(password, user.password);
            if (checkPassword) {
                let token = await jwt.sign({ id: user._id },process.env.SECRET_CODE);
                res.cookie("token", token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
                res.send("Login Successfull");
            }
            else {
                throw new Error("invalid credential");
            }
        }
    }
    catch (err) {
        res.send("ERROR : " + err.message);
    }
})

authRouter.post("/logout", async(req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now()) })
    res.send("Logged out successfully");
})



module.exports = { authRouter };