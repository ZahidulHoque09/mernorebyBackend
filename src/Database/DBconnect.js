

const mongoose = require("mongoose");

const chalk = require("chalk");

const dbConnect = async ()=>{

try {
  const databaseInstance = await mongoose.connect(process.env.MONGODB_DATABASE_URL)
 

  if(databaseInstance){

    console.log(chalk.bgyellowBright("Data base connectio successful",databaseInstance.connection.host));
    
    
   
    
  }
  
} catch (error) {
  console.log("Data base connection error", error);

  
  
}
};

module.exports = {dbConnect};