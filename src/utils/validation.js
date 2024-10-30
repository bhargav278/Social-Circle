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

module.exports = signUpDataValidation;