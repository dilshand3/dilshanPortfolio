import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    ProfileImg : {
        type : String
    },
    AboutImg : {
        type : String
    },
    myCV : {
        type : String
    }
},{timestamps: true});


export const Admin = mongoose.model("Admin", adminSchema);