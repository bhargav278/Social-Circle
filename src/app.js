require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require("./config/Database");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const { authRouter } = require("./Routes/Auth");
const { profileRouter } = require("./Routes/profile");
const { requestRouter } = require("./Routes/request");
const { userRouter } = require("./Routes/user");

app.use("/", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);
app.use("/user", userRouter);


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