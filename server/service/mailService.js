const nodemailer = require ('nodemailer')


let emailSender = process.env.GOOGLE_MAIL;


const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 587, 
    secure: false,
    auth: {
        user: emailSender,
        pass: process.env.PASSWORD_GOOGLE_MAIL
    }
})
module.exports.sendLink = async(to, link) => {
    await transport.sendMail({from: emailSender, to: to, subject: "Activation link ParseRss", text: `${link}`})
}