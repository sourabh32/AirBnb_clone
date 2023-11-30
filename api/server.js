const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const CookieParser = require("cookie-parser")
const { urlencoded } = require('body-parser')
const { errorHandler, notFound } = require('./middlewares/errorMiddleware')
const { userRouter } = require('./routes/userRoutes')
const { connectDB } = require('./utils/dbConnect')
require('dotenv').config()
const app = express()

connectDB()



app.use(CookieParser())
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))
app.use(express.json())
app.use(urlencoded({extended:true}))


app.use("/api/user",userRouter)



app.use(notFound)
app.use(errorHandler)

app.listen(4000,()=>{
    console.log("server listening at port 4000 ")
})