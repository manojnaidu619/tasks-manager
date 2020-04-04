const mongoose = require("mongoose")
const validator = require("validator")

const User = mongoose.model('User', {
    name: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        min: 18,
    },
    email: {
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid!")
            }
        }
    },
    password: {
        type: String,
        trim: true,
        minlength: 5,
        validate(value) {
            if (value === 'password') {
                throw new Error("Invalid password")
            }
        }
    }
})

module.exports = User