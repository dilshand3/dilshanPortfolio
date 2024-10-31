import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
    projectname: {
        type: String
    },
    projectURL: {
        type: String
    },
    githubURL: {
        type: String
    },
    projectImg: {
        type: String
    },
    projectCategory: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Project = mongoose.model("Project", projectSchema);