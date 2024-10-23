


require("dotenv").config();

const chalk = require("chalk");
const {dbConnect} = require("./Database/DBconnect.js")

const {app} = require("./app.js")



dbConnect().then (()=>{

    app.listen(process.env.PORT || 4000, ()=>{

        console.log(
             chalk.bgGreenBright.underline(`Server running on port ${process.env.PORT}`
        
             ) 
            )
    })

    })
    .catch((err)=>{
    console.log(chalk.bgCyanBright("Database connection error" ,err));
    

})