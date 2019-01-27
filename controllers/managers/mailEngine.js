const nodemailer = require("nodemailer");
var ejs = require('ejs')
var fs = require('fs');

const emailDir = './views/components/emailTemplates/';

module.exports = {

sendBookingEmail: function(data){

  // async..await is not allowed in global scope, must use a wrapper
async function main(){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let account = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Best booking site ever" <best@booking.com>', // sender address
    to: "kazzaseven@tats.com", // list of receivers
    subject: "Let Me Book!", // Subject line
    text: "Hello world?", // plain text body
    html: "<h1>Testing</h1> <br><br> <p> " + data.fullName + "</p>"// html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  return nodemailer.getTestMessageUrl(info);
}

var url = main().catch(console.error);

return url;
}

}
