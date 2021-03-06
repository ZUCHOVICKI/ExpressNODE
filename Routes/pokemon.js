const express = require('express');
const pokemon = express.Router();
const db = require('../config/database')


pokemon.post("/", async (req,res,next)=>{
    const {pok_name , pok_height,pok_weight, pok_base_experience} = req.body;

    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let query = "INSERT INTO pokemon(pok_name ,pok_height,pok_weight,pok_base_experience)"
        query += `VALUES('${pok_name}',${pok_height},${pok_weight},${pok_base_experience})`
        
        const rows = await db.query(query)
        console.log(rows)
    
        if(rows.affectedRows ==1){
            return res.status(201).json({code:201,message:"Pokemon insertado correctamente"})
    
        }
        
        return res.status(500).json({code:500,message:"Error"})
    }
    return res.status(500).json({code:500,message:"Campos incompletos"})
})

pokemon.delete("/:id([0-9]{1,3})", async(req,res,next)=>{

const query = `DELETE FROM pokemon Where pok_id=${req.params.id}`

const rows  = await db.query(query)
if(rows.affectedRows == 1 ){

    return res.status(200).json({code:200,message:"Pokemon Borrado"})

}
else{return res.status(404).json({code:404,message:"Pokemon X no encontrado"})
}
})

pokemon.put("/:id([0-9]{1,3})", async(req,res,next)=>{
    const {pok_name , pok_height,pok_weight, pok_base_experience} = req.body;


    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let query = `UPDATE pokemon SET pok_name='${pok_name}',`
        query += `pok_height=${pok_height},pok_weight=${pok_weight},pok_base_experience=${pok_base_experience} WHERE pok_id = ${req.params.id}`
    
        
        const rows = await db.query(query)
        console.log(rows)
    
        if(rows.affectedRows ==1){
            return res.status(200).json({code:200,message:"Pokemon Actualizado correctamente"})
    
        }
        
        return res.status(500).json({code:500,message:"Error"})
    }
    return res.status(500).json({code:500,message:"Campos incompletos"})
    
    


    
})

pokemon.patch("/:id([0-9]{1,3})", async(req,res,next)=>{


    if(req.body.pok_name){
   
        let query = `UPDATE pokemon SET pok_name='${req.body.pok_name}'WHERE pok_id = ${req.params.id}`
        
    
        
        const rows = await db.query(query)
        console.log(rows)
    
        if(rows.affectedRows ==1){
            return res.status(200).json({code:200,message:"Pokemon Actualizado correctamente"})
    
        }
        
        
    
   return res.status(500).json({code:500,message:"Pokemon no encontrado"})
    
    

    }
    return RTCRtpSender.status(500).json({code:500,message:"Datos Incompletos"})
    
})


 pokemon.get("/", async (req,res,next)=>{
    const pkmn = await db.query("SELECT * FROM pokemon")
    console.log(pkmn)
    res.status(200)
    res.json({code:200,message:pkmn})

 })

 pokemon.get('/:id([0-9]{1,3})', async (req,res,next)=>{
    const id = req.params.id 
    if(id > 0 &&id  <= 800){
        const pkmn = await db.query("Select * from pokemon where pok_id = ?",[id])
        res.status(200)
        res.json({code:200,message:pkmn})

    }
    else {
        res.status(404)
        res.json({code:404,message:"Pokemon no Encontrado"})
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

    res.status(200).json({code:1,message:pkmn})
 })

 module.exports = pokemon