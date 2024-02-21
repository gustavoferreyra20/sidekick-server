const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: "SideKick",
        to: to,
        subject: subject,
        text: text
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info.response;
    } catch (error) {
        console.error("Error occurred while sending email:", error);
        throw error;
    }
}

module.exports = sendEmail;