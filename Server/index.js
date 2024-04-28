const express = require('express')
require('dotenv').config()
const connectDB = require('./db')

const authRoutes = require('./routes/authRoutes')
const jobRoutes = require('./routes/jobRoutes')

const app = express();
app.use(express.json())

app.use("/v1/auth",authRoutes)
app.use("/v1/job",jobRoutes)

app.use((error, req, res , next) => {
    console.error(error)
    res.status(500).json({ errorMessage: "Something went wrong" });
})

connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running at port ${process.env.PORT}`)
    })
}).catch((error)=>{
    console.error("Error while server is getting up",error)
})