const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser()) // for getting token in auth

const cors = require('cors')
app.use(cors()) // for api communication in react

const dotenv= require('dotenv')
dotenv.config({path:'./.env'})
const web = require('./routes/web')
const connectdb = require('./db/connectdb')
//file upload
const fileUpload=require('express-fileupload') //for file upload
//tempfiles uploaderz
app.use(fileUpload({useTempFiles:true}))

// for data get in api
app.use(express.json())


connectdb()




//load route
app.use('/api',web) 
//localhost:4000/api











//server create
app.listen(process.env.PORT,()=>{
    console.log(`server running on localhost: ${process.env.PORT}`)
})