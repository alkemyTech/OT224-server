const { send } = require("../services/emails");
const ejs = require("ejs");


  const emailContact = async(contact) => {
    
    try{
        const output = await ejs.renderFile("./views/emailContact.ejs", {name: contact.name}); 
        if(output) {           
          const to=contact.email;
          const subject= `Bienvenid@ a Somos Más 🙌  !!! `;
          const body= output;

          await send(to,subject,body);
          return true

        } else { 
          return false
        }
    } catch (error) {
        console.log(error)
        return false   
    }

 }  

 


module.exports={ emailContact };
