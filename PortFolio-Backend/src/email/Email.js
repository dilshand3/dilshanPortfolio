import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { VERIFICATION_EMAIL_TEMPLATE } from "./EmailTemplate.js";

dotenv.config({
    path : "../.env"
})

export const sendVerificationEmail = async (email, VerificationCode,username) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_MAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: 'Email verification',
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{{VERIFICATION_CODE}}', VerificationCode).replace('{{username}}', username),
            replyTo: 'no-reply@example.com'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    } catch (error) {
        console.log("Something went wrong while sending email", error);
        throw new Error(error)
    }
}