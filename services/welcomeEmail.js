const email = require("../services/emails");
const ejs = require("ejs");


  const welcomeEmail = async(user) => {
    try{
        const output = await ejs.renderFile("./views/emailWelcome.ejs", {name: user.firstName + ' ' + user.lastName}); 
        
        if(output) {           
          const to=user.email;
          const subject= `Bienvenid@ a Somos Más 🙌  !!! `;
          const body= output;

          await email.send(to,subject,body);
          return emailSent=true

        } else { 
          return emailSent=false
        }
    } catch (error) {
        console.log(error)
        return emailSent=false   
    }

 }  

 


module.exports={ welcomeEmail };

