const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const cors = require("cors")
const mongoose = require("mongoose")
const MONGO_URl = process.env.MONGO_URI
const PORT = process.env.PORT


app.use(express.json())
app.use(cors())

mongoose.connect(MONGO_URl).then(()=>console.log("Database Connected")).catch((error)=>console.log(error))



app.use("/v1/auth",require("./controllers/AuthenticationController"))
app.use("/v2/attend",require("./controllers/AttendenceController"))








app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`)
})