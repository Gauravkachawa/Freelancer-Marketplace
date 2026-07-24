const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(

    {

        title: {

            type: String,

            required: true,

            trim: true

        },

        description: {

            type: String,

            required: true

        },

        budget: {

            type: Number,

            required: true

        },

        category: {

            type: String,

            required: true

        },

        skills: [

            {

                type: String

            }

        ],

        deadline: {

            type: Date,

            required: true

        },

        client: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },

        assignedFreelancer: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            default: null

        },

        status: {

            type: String,

            enum: ["Open", "In Progress", "Completed"],

            default: "Open"

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model("Project", projectSchema);