import Router from "express";
import { upload } from "../middlewares/multer.middleware.js"
import { newProject,DeleteProject, ShareProject } from "../controller/project.controller.js";
const router = Router();

router.route("/Addproject").post(upload.fields([
    {
        name: "projectImg",
        maxCount: 1
    }
]), newProject);
router.route("/Deleteproject").post(DeleteProject);
router.route("/Allproject").get(ShareProject)

export default router