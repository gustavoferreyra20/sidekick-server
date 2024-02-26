const nodemailer = require("nodemailer");
const axios = require('axios');

async function sendNotifications(to, subject, text) {
    try {
        // Sending email
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

        const emailInfo = await transporter.sendMail(mailOptions);
        console.log("Email sent:", emailInfo.response);

        // Sending notification
        const notificationInfo = await axios.post('https://app.nativenotify.com/api/notification', {
            appId: 19862,
            appToken: process.env.APP_TOKEN,
            title: subject,
            body: text,
            dateSent: new Date().toLocaleString(), // Use current date and time
        });
        console.log('Notification sent successfully:', notificationInfo.data);

        return { email: emailInfo.response, notification: notificationInfo.data };
    } catch (error) {
        console.error("Error occurred while sending notifications:", error);
        throw error;
    }
}

module.exports = sendNotifications;