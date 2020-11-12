const express = require('express');
const user = express.Router();
const db = require('../config/database')
const jwt = require('jsonwebtoken');

user.post("/signin", async(req,res,next) =>{
    const {user_name,user_mail,user_password} = req.body

    if(user_name && user_mail && user_password){
   let query = `INSERT INTO user( user_name, user_mail, user_password) `
   query += `Values('${user_name}','${user_mail}','${user_password}')` 

   const rows = await db.query(query);

   if(rows.affectedRows==1){

    return res.status(201).json({code:201,message:"Usuario Registrado correctamente"})
   }

   return res.status(500).json({code:500,message:"Ocurrio un Error"})
}
else{
   return res.status(500).json({code:500,message:"Campos Incorrectos"})
}
})


user.post("/login",async(req,res,next)=>{

const {user_mail,user_password} = req.body
const query = `Select * from user where user_mail = '${user_mail}' and user_password = '${user_password}';`
const rows = await db.query(query)


if(user_password&&user_mail){
if(rows.length == 1){
    const token = jwt.sign({
        user_id : rows[0].user_id,
        user_mail: rows[0].user_mail
    }, 'debugkey')
    return res.status(200).json({code:200,message:token})
}
else{

    return res.status(200).json({code:200,message:'Usuario y/o contraseña incorrecta'})
}

}
return res.status(500).json({code:500,message:'Campos Incompletos'})
})

user.get("/",async(req,res,next)=>{

    let query = `Select * from user`
   const rows = await db.query(query);

   
    return res.status(200).json({code:200,message:rows})

})




module.exports = user;