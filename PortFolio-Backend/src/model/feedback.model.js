import mongoose,{Schema} from "mongoose";

const feedbackSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    feedback : {
        type : String
    }
},{timestamps : true})

export const Feedback = mongoose.model("Feedback",feedbackSchema)