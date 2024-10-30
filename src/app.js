require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require("./config/Database");
const User = require("./Models/User");
const userData = require('./init/data');
const signUpDataValidation = require("./utils/validation")
// const argon2 = require('argon2');
const bcrypt = require('bcrypt');
const validator = require("validator");

app.use(express.json());

app.post("/signup", async (req, res) => {

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

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credential");
        }
        else {
            const checkPassword = await bcrypt.compare(password, user.password);
            if (checkPassword) {
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

app.get("/feed", async (req, res) => {
    try {
        let users = await User.find({});
        res.send(users);
    }
    catch (err) {
        res.send("ERROR : " + err.message);
    }
})

app.get("/user", async (req, res) => {
    let userEmail = req.body.emailId;
    try {
        let users = await User.find({ emailId: userEmail });

        if (users.length === 0) {
            res.status(401).send("no user found");
        }
        else {
            res.send(users);
        }
    }
    catch (err) {
        res.send("ERROR : " + err.message);
    }
})

app.patch("/user/:userId", async (req, res) => {
    let userId = req.params?.userId;
    let data = req.body;
    try {
        const ALLOWED_UPDATES = ["lastName", "password", "age", "gender", "about", "profileUrl", "skills"];
        const checkValidations = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

        if (!checkValidations) {
            throw new Error("can not update or add some properties");
        }
        else {
            let user = await User.findByIdAndUpdate(userId, data);
            res.send("Updated Successfully");
        }
    }
    catch (err) {
        res.send("ERROR : " + err.message);
    }

})

app.delete("/user", async (req, res) => {
    let userId = req.body.userId;
    try {
        let user = await User.findByIdAndDelete(userId);
        if (user) {
            res.send(user)
        }
        else {
            res.status(401).send("no user found");
        }

    }
    catch (err) {
        res.send("ERROR : " + err.message);
    }
})

app.post("/init", async (req, res) => {
    try {
        await User.deleteMany({})
            .then(() => {
                console.log("deleted all Data");
            })
        await User.insertMany(userData)
            .then(() => {
                console.log("Inserted All Data");
            })
        res.send("Done")
    }
    catch (err) {
        res.send("ERROR : " + err.message);
    }
})


connectDB()
    .then(() => {
        console.log("connection established");
        app.listen(process.env.PORT, () => {
            console.log("server is running on 4000");
        })
    })
    .catch(() => {
        console.log("connot connect to database")
    })