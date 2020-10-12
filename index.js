const bodyParser = require('body-parser')
const express = require("express");

const app = express();
const {pokemon} = require('./pokedex.json')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res,next)=>{
    
    
    res.status(200).send("Bienvenido al Pokedex")

})

app.post("/pokemon",(req,res,next)=>{

    res.status(200).send(req.body.name)
})

 app.get("/pokemon",(req,res,next)=>{
    
    res.status(200)
    res.send(pokemon)

 })

 app.get('/pokemon/:id([0-9]{1,3})',(req,res,next)=>{
    const id = req.params.id -1 
    if(id >= 0 &&id  <= 150){
        res.status(200)
        res.send(pokemon[req.params.id - 1 ])

    }
    else {
        res.status(404)
        res.send('Pokemon no encontrado')
    }

 })

 app.get('/pokemon/:name([A-Za-z]+)',(req,res,next)=>{

    const name = req.params.name
    const poke = pokemon.filter((p)=>{
        if(p.name.toUpperCase() == name.toUpperCase()){

            return p 
        }
        
        
    })

    if(poke.length >0){
        res.status(200).send(poke)
    }

    res.status(404).send('Pokemon No encontrado')
    
    

 })

app.listen(process.env.PORT ||4000,()=>{

    console.log("Server is Running...")
})
