const express = require("express")
const mongoose = require("mongoose")
const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')
const session = require('express-session')
const redis = require('redis')
let RedisStore = require("connect-redis")(session)

let redisClient = redis.createClient({
    host: "redis",
    port: "6379"
})

const app = express()


app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: "sfsjfjsdkfjdjfd",
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 30000,
    }
}))
app.use(express.json())

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
        "<h2>Hello there it is!!!! My name is <i>Roger De Bong. I am a strong person.</i></h2><h3>This is h3 and h1</h3>"
    )
})

app.use("/api/v1/posts",postRouter)
app.use("/api/v1/users",userRouter)


const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`)
})