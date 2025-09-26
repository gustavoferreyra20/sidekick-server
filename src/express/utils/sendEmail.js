const nodemailer = require("nodemailer");

async function sendEmail(to, subject, htmlContent) {
  try {

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"SideKick" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    return info.response;

  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
}

module.exports = sendEmail;