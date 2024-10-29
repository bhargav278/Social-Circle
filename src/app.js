require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require("./config/Database.js");
const User = require("./Models/User.js");

app.use(express.json());

app.post("/signup", async (req,res)=> {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("Data saved succesfully");
    }
    catch {
        res.status(401).send("can not be saved")
    }
    
})


app.get("/feed", async(req, res)=> {
    try {
        let users = await User.find({});
        res.send(users);
    }
    catch {
        res.status(401).send("no user found");
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
    catch {
        res.status(401).send("no user found");
    }
})

app.patch("/user", async (req, res) => {
    let userId = req.body.userId;
    let data = req.body;
    console.log(data)
    try {
        let user = await User.findByIdAndUpdate(userId,data);
        res.send(user);
    }
    catch {
        res.status(401).send("no user found");
    }

})

app.delete("/user", async (req, res) => {
    let userId = req.body.userId;
    try {
        let user = await User.findByIdAndDelete(userId);
        if (user) {
            res.send(user)
        }
        else{
            res.status(401).send("no user found");
        }
        
    }
    catch {
        res.status(401).send("no user found");
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