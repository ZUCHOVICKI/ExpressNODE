
const morgan = require('morgan')
const express = require("express");
const pokemon = require('./Routes/pokemon');
const user = require('./Routes/user');
const app = express();



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))


app.get("/",(req,res,next)=>{
    
    
    res.status(200).json({code:1,message:"Bienvenido al Pokedex"})

})

app.use("/pokemon",pokemon)

app.use("/user",user)

app.use((req,res,next)=>{

    return res.status(404).json({code:404,message:"URL no encontrado"})
})

app.listen(process.env.PORT ||4000,()=>{

    console.log("Server is Running...")
})



