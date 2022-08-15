const mongoose=require('mongoose')
mongoose.connect(URL)
let connectionobj=mongoose.connection;
connectionobj.on('connected',()=>{
    
    console.log("Mongodb Connected")
})
connectionobj.on('error',()=>{
    console.log('Error in connecting')

})
module.exports=mongoose