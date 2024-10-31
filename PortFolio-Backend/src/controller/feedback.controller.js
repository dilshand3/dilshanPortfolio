import { asyncHandler } from "../utils/asyncHandler.js";
import { Feedback } from "../model/feedback.model.js";
import mongoose from "mongoose";

const feedback = asyncHandler(async (req, res) => {
    const { name, feedback } = req.body;

    if (!name || !feedback) {
        throw new Error("All field required")
    }

    const createdFeedBack = await Feedback.create({
        name,
        feedback
    })

    res.status(200).json({ message: "feedback created succesfully", data: createdFeedBack })
})

const sendFeedBack = asyncHandler(async (req,res) => {
    const allFeedBack = await Feedback.find();
    res.status(200).send(allFeedBack)
})

const deleteFeedback = asyncHandler (async (req,res) => {
    const { id } = req.body;
    console.log(req.body);
    
    
    if (!id) {
        throw new Error("Feedback ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Feedback ID format");
    }

    const deletedFeedBack = await Feedback.findByIdAndDelete(id);

    if (!deletedFeedBack) {
        throw new Error("feedback not found");
    }

    res.status(200).json({ message: "feedback successfully deleted" });
})

export { feedback, sendFeedBack, deleteFeedback }