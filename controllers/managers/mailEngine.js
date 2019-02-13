const nodemailer = require("nodemailer");
var ejs = require('ejs')
var fs = require('fs');

const emailDir = './views/components/emailTemplates/';
const toAddress = 'kaymieseven@outlook.com';

function createAttachmentsArray(files){

  var attachments = [];

  var fileArray = [];
  var array = Object.keys(files);

  array.forEach(function(key){
    fileArray.push(files[key]);
  })

  for(var i = 0; i < fileArray.length; i++){
    attachments[i] = {
                      filename: fileArray[i].name,
                      content:  fileArray[i].data
                     }

  }

  return attachments;
}

module.exports = {

sendBookingEmail: function(req){

  let data = req.body;

  // async..await is not allowed in global scope, must use a wrapper
async function main(){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let account = await nodemailer.createTestAccount();

  //create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass // generated ethereal password
    }
  });

  // var transporter = nodemailer.createTransport({
  //  service: 'gmail',
  //  auth: {
  //         user: 'k7bookings@gmail.com',
  //         pass: 'gmail password'
  //     }
  // });

  var html = await ejs.renderFile(emailDir + "bookingEmail.ejs", { data: data });

  test(req.files);

  // setup email data with unicode symbols
  let mailOptions = {
    from: data.fullName + ' <' + data.email + '>', // sender address
    to: 'dalebarrieit@gmail.com', // list of receivers
    subject: "Tattoo Booking", // Subject line
    text: "", // plain text body
    html: html,// html body
    // attachments: [{
    //     // filename: req.files.refPhoto.name,
    //     filename: 'attachments',
    //     // content:  req.files.data
    // }]
    attachments: createAttachmentsArray(req.files)
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
