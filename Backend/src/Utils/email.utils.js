import nodemailer from "nodemailer";

import dotenv from "dotenv";        


dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",  
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
}); 

const sendVerificationEmail = async (email, verificationURL) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email Verification",
        text: `Click the link to verify your email: ${verificationURL}`
    }; 

    try {
        await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully");
    } catch (error) {   
        console.error("Error sending verification email:", error);
    }
};

const sendResetPasswordEmail = async (email, resetURL) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset",

        html: `
            <h2>Password Reset</h2>

            <p>Click below to reset your password:</p>

            <a href="${resetURL}">
                Reset Password
            </a>

            <br/>
            <br/>

            <p>${resetURL}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Reset password email sent successfully");
    } catch (error) {
        console.error("Error sending reset password email:", error);
    }   
};

export { sendVerificationEmail, sendResetPasswordEmail }