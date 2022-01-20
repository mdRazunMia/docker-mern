const express = require("express")
const mongoose = require("mongoose")

const app = express()

mongoose
.connect("mongodb://dotOnline:dotonline@mongo:27017/?authSource=admin")
.then(()=>{
    console.log("Successfully connected to DB")
})
.catch((e)=>{
    console.log(e)
})

app.get('/',(req, res)=>{
    res.send(
        "<h2>Hello there it is!!!! My name is <i>Roger De Bong. I am a strong person.</i></h2><h3>This is h3</h3>"
    )
})

const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`)
})