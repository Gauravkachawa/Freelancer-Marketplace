const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["client", "freelancer", "admin"],
        default: "client"
    },

    profileImage: {
        type: String,
        default: ""
    },

    skills: {
        type: [String],
        default: []
    },

    portfolio: {
        type: [String],
        default: []
    },

    rating: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;