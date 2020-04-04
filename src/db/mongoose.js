const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value === 'password') {
                throw new Error("Invalid password")
            }
        }
    }
})

const record = new User({
    name: "Manoj",
    age: 20,
    password: "passwor"
}).save().then((res) => console.log(res)).catch((err)=> console.log(err))