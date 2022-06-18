//AGREGAR AL CONTROLLER DE REGISTER ( al servicio de create user ):
//importar la función : const {welcomeEmail}=require ('./sendEmail);
//Luego de la respuesta de "usuario creado"...
//invocar a la función : welcomeEmail(users.dataValues);

const sgMail = require("../services/sendgrid");
const ejs = require("ejs");
const htmlMessage = require("../views/emailWelcome.ejs");
require("dotenv").config();

const welcomeEmail = async (req,res) => {
    
  const {firstName,lastName, email}=req
    
  let output = await ejs.renderFile("./views/emailWelcome.ejs", {name: firstName + ' ' + lastName});

  const message = {
    to: email,
    from: "somos.mas.97@gmail.com",
    subject: `Bienvenid@ a Somos Más 🙌  !!! `,
    html: output,
    mail_settings: {
      sandbox_Mode: {
        enable: false, // false : envia el email, true: modo prueba, confirma si el envio esta ok,pero no lo realiza
      },
    },
  };

  try {
    await sgMail.send(message);
    console.log("Message sent successfully");
  } catch (err) {
    console.log(err);
    return res.status(err.code).send(err.message);
  }

};

module.exports = welcomeEmail;
