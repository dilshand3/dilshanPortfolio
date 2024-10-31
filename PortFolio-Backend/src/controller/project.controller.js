import mongoose from "mongoose";
import { Project } from "../model/project.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const newProject = asyncHandler(async (req, res) => {
    const { projectname, projectURL, githubURL, projectCategory } = req.body;
    console.log(req.body);
    if (!projectURL || !projectname || !githubURL || !projectCategory) {
        throw new Error("All field req");
    }
    const projectImgLocal = await req.files?.projectImg?.[0].path;

    if (!projectImgLocal) {
        return res.status(400).json({ success: false, message: "Project image is required" });
    }

    const projectImg = await uploadOnCloudinary(projectImgLocal);

    if (!projectImg) {
        return res.status(400).json({ success: false, message: "Project image didn't upload" });
    }

    const createdProject = await Project.create({
        projectname,
        projectURL,
        githubURL,
        projectCategory,
        projectImg: projectImg.url,
    })

    res.status(200).json({ success: true, message: "project added succesfully", data: createdProject })
})

const DeleteProject = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        throw new Error(401, "skill id is required")
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(400, "Invalid id for skill")
    }

    const DeleteProject = await Project.findByIdAndDelete(id);
    if (!DeleteProject) {
        throw Error(400, "deleteSkill not found")
    }
    res.status(200).json({ success: true, message: "project deleted succesfully" })
})

const ShareProject = asyncHandler(async (req, res) => {
    const AllProject = await Project.find();
    if (!AllProject) {
        return res.status(400).json({ success: false, message: "No project found" })
    }
    res.status(200).json(AllProject)
})


export { newProject, DeleteProject, ShareProject }