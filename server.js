const express = require('express')
const userRoute=require('./routes/userRoute')
const adminRoute=require('./routes/adminRoute')
const doctorRoute=require('./routes/doctorRoute')
require('dotenv').config()
 const dbConfig=require("./config/dbConfig");

const app = express()

app.use(express.json())
const path = require('path')
 }

app.use('/api/user', userRoute)
app.use('/api/admin',adminRoute)
app.use('/api/doctor/',doctorRoute)

if(process.env.NODE_ENV==='production')
{

    app.use('/' , express.static('client/build'))

    app.get('*' , (req , res)=>{

          res.sendFile(path.resolve(__dirname, 'client/build/index.html'));

    })


const port = process.env.PORT || 5001
 


app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));