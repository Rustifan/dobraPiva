const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_PASS
    }
  });


async function send(mail, subject, text){
    try{
        let info = await transporter.sendMail({
            from: "support@dobrapiva.com", 
            to: mail, 
            subject: subject,
            html: text
          });
    
          console.log(info);
          
    }
    catch(err)
    {
        console.log("email sending failed:\n" + err);
    }
    
}

module.exports.transporter = transporter;
module.exports.send = send;

