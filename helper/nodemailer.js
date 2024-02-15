const nodemailer = require('nodemailer');
require("dotenv").config();

exports.passwordResetEmail = emailData => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: "pradityaluthfi54@gmail.com",
            pass: "fnmyoouvtiswrbce"
        },
    });
    
    return (
        transporter.sendMail(emailData)
        .then(info =>  console.log(`E-mail sent: ${info.messageId}`))
        .catch(err =>  console.log(`There is an error: ${err}`))
    );
}