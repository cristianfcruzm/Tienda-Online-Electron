const {config} = require('./config/config');
const nodemailer = require("nodemailer");

const email = config.emailSender;
const password = config.passwordSender;

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
        user: email,
        pass: password
    }
});

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Fred Foo 👻" <${email}>`, // sender address
    to: "cristianf.cruzm@gmail.com", // list of receivers
    subject: "Este es un nuevo correo ✔", // Subject line
    text: "Hola Cristian", // plain text body
    html: "<b>Hola Cristian</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMail().catch(console.error);
