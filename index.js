const bodyParser = require('body-parser')
const morgan = require('morgan')
const express = require("express");
const pokemon = require('./Routes/pokemon')
const app = express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'))


app.get("/",(req,res,next)=>{
    
    
    res.status(200).send("Bienvenido al Pokedex")

})

app.use("/pokemon",pokemon)
app.listen(process.env.PORT ||4000,()=>{

    console.log("Server is Running...")
})



