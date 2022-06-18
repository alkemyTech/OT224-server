require("dotenv").config();
const sgMail= require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_APIKEY)

module.exports=sgMail;