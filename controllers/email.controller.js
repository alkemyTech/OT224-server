const emails = require("../services/emails");
const ejs = require("ejs");


  const welcomeEmail = async(users) => {
    try{
        const output = await ejs.renderFile("./views/emailWelcome.ejs", {name: users.firstName + ' ' + users.lastName}); 
        if(output) {           
          const to=users.email;
          const subject= `Bienvenid@ a Somos Más 🙌  !!! `;
          const body= output;

          await emails.send(to,subject,body);
          console.log({msg:"Message sent successfully"})  

        } else {
          console.log({msg:"Error in ejs"})  
        }
    } catch (error) {
        console.log({msg:"Message was not sent",error})       
    }

 }  

 


module.exports={ welcomeEmail };

