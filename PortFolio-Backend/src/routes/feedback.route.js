import Router from "express";
import { feedback,sendFeedBack,deleteFeedback } from "../controller/feedback.controller.js";

const router = Router();

router.route("/feedback").post(feedback);
router.route("/allFeedback").get(sendFeedBack);
router.route("/deleteFeedback").post(deleteFeedback);

export default router