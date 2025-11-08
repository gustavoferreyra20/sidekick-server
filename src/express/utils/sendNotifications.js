const nodemailer = require("nodemailer");
const axios = require('axios');
const sequelize = require("../../sequelize/index");

async function sendNotifications(to, subject, text) {
    try {
        // Buscar token del usuario
        const query = `
            SELECT t.*
            FROM tokens t
            JOIN users u ON u.id_user = CAST(t.id_user AS INT)
            WHERE u.email = :email;
        `;
        const [userWithToken] = await sequelize.query(query, {
            replacements: { email: to },
            type: sequelize.QueryTypes.SELECT
        });

        if (userWithToken && userWithToken.token) {
            const response = await sendPushNotification(userWithToken.token, subject, text);
            return { notification: response };
        } else {
            console.log('No token found for the user:', to);
            return {};
        }

    } catch (error) {
        console.error("Error occurred while sending notifications:", error);
        throw error;
    }
}

async function sendPushNotification(expoPushToken, title, text) {
    try {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: title || "SideKick",
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
        throw error;
    }
}

module.exports = sendNotifications;