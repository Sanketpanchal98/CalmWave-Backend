import app from "./app.js";
import { configDotenv } from "dotenv";
import connectionDB from "./database/connectionDB.js";

configDotenv({
    path: './.env'
});

connectionDB()
.then(() => {
    app.listen( process.env.PORT || 4040, () => {
        console.log( 'Server is running on port : ', process.env.PORT || 4040 )
    });
})
.catch((err) => {
    console.log('Error occured : ', err);
    throw err;    
})