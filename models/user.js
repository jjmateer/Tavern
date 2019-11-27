const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: "Name is Required",
    },
    email: {
        type: String,
        unique: true,
        required: "Email is Required",
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [
            function (input) {
                return input.length >= 6;
            },
            "Password should be longer."
        ]
    },
    userCreated: {
        type: Date,
        default: Date.now
    },
    isLoggedin: {
        type: Boolean
    }
});
const User = mongoose.model("User", userSchema);
module.exports = User;