const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.post('/api/justify' , verifytoken , ( req , res ) =>{
   jwt.verify(req.token , 'secretkey' , (err , authData) => {
   
    if(err){
        res.sendStatus(403);
    } else{

        res.status(200).json({
        message: 'it works'
         })
    }
    });
});

app.post('/api/login' , ( req , res ) =>{
    //mock user
    const  user ={
        id: 1,
        username: 'zikurika',
        email: 'beha@gmail.com',
    }
    
    jwt.sign({user} , 'secretkey' , (err , token) => {
        res.json({
            token
        });
    });
} )

function verifytoken(req , res , next){

    //get the auth header value
    const bearerheader = req.headers['authorization'];
    //check if beared is undefined

    if(typeof bearerheader !== 'undefined'){
      
        //spliting
        const bearer = bearerheader.split(' ');
       
        //set the token
        req.token = bearer[1];

        next();
    } else {
        res.sendStatus(403);
    }

}

module.exports = app;