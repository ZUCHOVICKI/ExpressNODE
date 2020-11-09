
const morgan = require('morgan')
const express = require("express");
const app = express();
//Routers
const pokemon = require('./Routes/pokemon');
const user = require('./Routes/user');


//Middleware separation 
const auth = require("./middleware/auth")
const notFound = require("./middleware/notFound")
const index = require("./middleware/index")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))


app.use(index)

app.use("/user",user)

app.use(auth)
app.use("/pokemon",pokemon)


app.use(notFound)


app.listen(process.env.PORT ||4000,()=>{

    console.log("Server is Running...")
})



