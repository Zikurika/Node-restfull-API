const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.text())


app.post('/api/justify' , verifytoken , ( req , res ) =>{
   jwt.verify(req.token , 'secretkey' , (err , authData) => {
   
    if(err){
        res.sendStatus(403);
    } else{
        res.send( justify(req.body) )
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

function spacing( firstText ){

    var allinedtext = justify(firstText);
    var spaces= [];
    var i,j;
    var lines = allinedtext.split('\r');
    var words = allinedtext.split(' ');
    var words1 = firstText.split(' ');
    return words1[30];
}

function justify ( firstText ){
    var array = firstText.split('');
    var letters = /^[A-Za-z]+$/;
    var finaltext;
    var i = 0 ;
    var j = 0;
    var spaces=[]
    while( i < array.length ){
        if(array[i]==' '){
            spaces.push(i);
        }
        if(array[i] == "\r" && array[i+1] == "\n" && array[i+2] == "\r" && array[i+3] == "\n"){
            finaltext+='\r';
            j=0;
            i+=4;
        }else if (array[i] == "\r" && array[i+1] == "\n"){
            var p = i;
            var k=0;
            var tester = true;
            while(tester){
            if(j==80&&array[p+1]!=letters){
                j=0;
                finaltext+='\r ';
                tester =false;
            }else{
               finaltext[spaces[k]] = '  ';
               p++;
               k++;
            }
            }
            j++;
            i+=2;
        }else{
            if(j==80){
                var p = i ;
                var k=0;
                var tester = true;
                while(tester){
                if(j==80&&array[p+1]!=letters){
                    j=0;
                    finaltext+='\r ';
                    tester =false;
                }else{
                   finaltext[spaces[k]] = '  ';
                   k++;
                   p++;
                }
                }
            }
            finaltext+=array[i];
            j++;
            i++;
        }
    }

    return finaltext;

}

function reseter( j , finaltext){
    
}

module.exports = app;