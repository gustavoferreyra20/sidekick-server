const nodemailer = require("nodemailer");
const axios = require('axios');
const sequelize = require("../../sequelize/index");

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
        // Sending notification
        const query = `
        SELECT t.*
        FROM tokens t
        JOIN users u ON u.id_user = CAST(t.id_user AS INT)
        WHERE u.email = 'apk@gmail.com';
    `;
        const [userWithToken] = await sequelize.query(query, {
            bind: {
                email: to,
            },
            type: sequelize.QueryTypes.SELECT
        });

        if (userWithToken && userWithToken.token) {
            const response = await sendPushNotification(userWithToken.token);
            return { email: emailInfo.response, notification: response };
        } else {
            console.log('No token found for the user:', to);
            return { email: emailInfo.response };
        }

    } catch (error) {
        console.error("Error occurred while sending notifications:", error);
        throw error;
    }
}

module.exports = sendNotifications;

async function sendPushNotification(expoPushToken, title, text) {
    try {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: title,
            body: text
        };

        const response = await axios.post('https://exp.host/--/api/v2/push/send', message, {
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error sending push notification:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}