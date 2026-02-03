import mongoose from "mongoose";
import { dbName } from "../constants/constantDB";


const connectionDB = async () => {
    
    try {
        
        await mongoose.connect( `${process.env.MONGO_URL}/${dbName}` )
        console.log( "Database connection successfully" );

    } catch (error) {

        console.log('Error occured', error);
        throw error;

    }

};

export default connectionDB;