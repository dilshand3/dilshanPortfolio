import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config({
    path : "./.env"
})
const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(cookieParser());
app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({extended : true}))

//project route
import projectRoute from "./routes/project.route.js";
app.use("/api/project",projectRoute)

//Skill route
// import skillRoute from "./routes/skill.route1.js";
// app.use("/api/skill",skillRoute)

//feedback route 
import feedbackRoute from "./routes/feedback.route.js";
app.use("/api/feedback",feedbackRoute)

//user router 
import UserRouter from "./routes/user.route.js";
app.use("/api/user",UserRouter);

//frontend skill route
// import frontendSkillRoute from "./routes/frontendSkill.route.js";
// app.use("/api/frontendSkill",frontendSkillRoute)

//backend skill route
// import backendSkillRoute from "./routes/backendSkill.route.js";
// app.use("/api/backendSkill",backendSkillRoute)

//general skill route
// import generalSkillRoute from "./routes/generalSkill.route.js";
// app.use("/api/generalSkill",generalSkillRoute)

//education route
// import educationRoute from "./routes/education.route.js";
// app.use("/api/education",educationRoute)

//admin route
import adminRoute from "./routes/admin.route.js";
app.use("/api/admin",adminRoute)

export {app}