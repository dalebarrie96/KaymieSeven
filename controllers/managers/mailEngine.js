const nodemailer = require("nodemailer");

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
    html: "<b>Hello world?</b> <p> " + data.fullName + "</p>" // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
}

}
