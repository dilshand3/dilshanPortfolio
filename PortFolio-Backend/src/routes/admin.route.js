import { Router } from "express";
import { ProfileImg, AboutImg, myCV, shareAdmin } from "../controller/admin.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// router.route("/profileimg").post( upload.single("profileImg"), ProfileImg);
router.route("/shareAdmin").get(shareAdmin)
router.route("/profileimg").post(upload.fields([{
    name : "ProfileImg",
    maxCount : 1
}]), ProfileImg);
router.route("/aboutimg").post( upload.fields([{
    name : "AboutImg",
    maxCount : 1
}]), AboutImg);
router.route("/mycv").post( upload.fields([{
    name : "myCV",
    maxCount : 1
}]), myCV);

export default router;