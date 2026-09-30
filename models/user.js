const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error("Email is invalid");
            }
        }
    },
    age: {
        type: Number,
        default: 18,
        validate(val) {
            if (val <= 0) {
                throw new Error("Age must be a positive number");
            }
        }
    },
    city: {
        type: String,
        trim: true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;