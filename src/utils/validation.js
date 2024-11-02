const validator = require('validator');

const signUpDataValidation = (req) => {
    const { firstName, lastName, emailId } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Please Enter Valid Name");
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Please Enter Valid Mail");
    }
}

const editDataValidation = (req) => {
    allowedEdit = ["firstName", "lastName", "age", "gender", "skills", "about", "profileUrl"];

    let isValid = Object.keys(req.body).every((key) => allowedEdit.includes(key));
    
    if (!isValid) {
        throw new Error("Unauthorized Edit!");
    }
}

const checkAllowedPasswordProperties = (req) => {
    allowedProperties = ["currentPassword", "newPassword", "confirmPassword"];
    let isValid = Object.keys(req.body).every((key) => allowedProperties.includes(key));
    if (!isValid) {
        throw new Error("Unauthorized Edit!");
    }
}

module.exports = {signUpDataValidation ,editDataValidation,checkAllowedPasswordProperties};