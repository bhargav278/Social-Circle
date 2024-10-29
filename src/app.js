require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require("./config/Database.js");
const User = require("./Models/User.js");

app.post("/signup", async (req,res)=> {
    const user = new User({
        firstName: "Kishan",
        lastName: "Vekariya",
        emailId: "kishan4596vekariya@gmail.com",
        password: "1234567890",
        age: 22,
        gender: "male"
    });
    try {
        await user.save();
        res.send("Data saved succesfully");
    }
    catch {
        res.status(401).send("can not be saved")
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