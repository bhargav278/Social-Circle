const express = require("express");
const { userAuth } = require("../Middleware/userAuth.js")
const { editDataValidation , checkAllowedPasswordProperties} = require("../utils/validation.js")
const bcrypt = require('bcrypt');
var validator = require('validator');

const profileRouter = express.Router();

profileRouter.get("/view", userAuth ,async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    }
    catch (err) {
        res.send("ERROR : " + err.message);
    }
})
  
profileRouter.patch("/edit", userAuth, async (req, res) => {
    try {
        editDataValidation(req);

        const loggedUser = req.user;
        const editUserData = req.body;
        Object.keys(editUserData).forEach((key) => loggedUser[key] = editUserData[key]);
        await loggedUser.save();
        res.send("Data Updated Successfully!");
    }
    catch (err) {
        res.send("ERROR : " + err.message);
    }
})

profileRouter.patch("/password", userAuth, async (req, res) => {
    try {
        checkAllowedPasswordProperties(req);
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const user = req.user;
        let checkCurrent = await bcrypt.compare(currentPassword, user.password);
        if (!checkCurrent) {
            throw new Error("Current Password is not valid!");
        }
        if (!validator.isStrongPassword(newPassword)) {
            throw new Error("New Password is not Strong!");
        }
        if (newPassword != confirmPassword) {
            throw new Error("Both password are not same!");
        }

        let hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        user.save();
        
        res.send("Password Changed Successfully!");
    }
    catch (err) {
        res.send("ERROR : " + err.message);
    }


})


module.exports = { profileRouter };