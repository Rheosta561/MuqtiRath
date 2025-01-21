const mongoose = require('mongoose');
require('dotenv').config();

const conn = async()=>{
    try {
        await mongoose.connect(process.env.URI);
        console.log("Mongoose connected successfully");
        

        
    } catch (error) {
        console.log("error connecting db",error.message);
        
    }
}
conn();



module.exports= conn;