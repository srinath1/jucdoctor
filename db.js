const mongoose = require("mongoose");

function connectDB(){

    const URL="mongodb+srv://nasa:nasa@graphqlnode.z5vfw.mongodb.net/JucDoctors?retryWrites=true&w=majority"


    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })


}

connectDB()

module.exports = mongoose
