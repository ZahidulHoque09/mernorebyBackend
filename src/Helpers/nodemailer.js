const nodemailer = require("nodemailer");
const { MakeTemplate } = require("./Template");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(userEmail, otp) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: userEmail,
    subject: "Verify Your Email ✔",

    html: MakeTemplate(otp),
  });

  console.log(info);

  if (info.messageId) {
    return true;
  }
}

module.exports = { sendMail };
