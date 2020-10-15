const express = require('express');
const pokemon = express.Router();
const db = require('../config/database')


pokemon.post("/",(req,res,next)=>{

    res.status(200).send(req.body)
})

 pokemon.get("/", async (req,res,next)=>{
    const pkmn = await db.query("SELECT * FROM pokemon")
    console.log(pkmn)
    res.status(200)
    res.json(pkmn)

 })

 pokemon.get('/:id([0-9]{1,3})', async (req,res,next)=>{
    const id = req.params.id 
    if(id > 0 &&id  <= 723){
        const pkmn = await db.query("Select * from pokemon where pok_id = ?",[id])
        res.status(200)
        res.send(pkmn)

    }
    else {
        res.status(404)
        res.send('Pokemon no encontrado')
    }

 })

 pokemon.get('/:name([A-Za-z]+)', async(req,res,next)=>{

    const name = req.params.name

    const name2 = name.toLowerCase()
    // const poke = pk.filter((p)=>{
    //     if(p.name.toUpperCase() == name.toUpperCase()){

    //         return p 
    //     }
        
        
    // })

    // if(poke.length >0){
    //     res.status(200).send(poke)
    // }

    // res.status(404).send('Pokemon No encontrado')
    
    
    const pkmn = await db.query("Select * from pokemon where pok_name = ?",[name2])

    res.status(200).send(pkmn)
 })

 module.exports = pokemon