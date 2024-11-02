var validator = require('validator');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        minLength: 3,
        maxLength: 40,
        validate(value) {
            if (!validator.isAlpha(value)) {
                throw new Error("Invalid First Name");
            }
        }
    },
    lastName: {
        type: String,
        required:true,
        uppercase: true,
        trim: true,
        minLength: 3,
        maxLength: 40, 
        validate(value) {
            if (!validator.isAlpha(value)) {
                throw new Error("Invalid Last Name");
            }
        }
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        immutable: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email!");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Invalid password!");
            }
        }
    },
    age: {
        type: Number,
        required: true,
        min:13,
    },
    gender: {
        type: String,
        required:true,
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("not valid gender");
            }
        }
    },
    about: {
        type: String,
        maxLength:100,
    },
    profileUrl: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEgDyViy34wvNGHcq3CKpG9SvB6w99Z_C5wnUc5vW0iW4_9BC-vuw5EtRpa8Gg0FV3JuE&usqp=CAU",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid URL!");
            }
        }
    },
    skills: {
        type: [String],
        validate: [
            {
                validator: function (skillsArray) {
                    return skillsArray.length >= 1 && skillsArray.length <= 10;
                },
                message: "Skills array must contain between 1 and 10 skills."
            },
            {
                validator: function (skillsArray) {
                    return skillsArray.every(skill => skill.length >= 1 && skill.length <= 30);
                },
                message: "Each skill must be between 2 and 20 characters long."
            }
        ]
    }
},
{ timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;