"use strict";
const express = require("express");
const app = express();
const PORT = 3000;
const cookieParser = require("cookie-parser");
const uuid = require("uuid").v4;
const data = require("./data");

const words = require("./words");
const web = require("./web");
const { userName2sidList, sidList, userName2secretWord } = require("./data");
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(express.static("./public"));


app.get('/', (req,res) => { 
    const sid = req.cookies.sid;
    if(data.sidList[sid]){
        const userName = data.getKeyByValue(userName2sidList, sid);
        const guess = data.userName2LastGuess[userName];       
        const secretWord = userName2secretWord[userName];
        res.send(web.gamePage(words,secretWord, guess,userName)); 
    }
    else{
        res.send(web.loginPage(data));
    }
        
});


app.get('/login', (req,res) => {
    
    
    if(!data.isSidValid(sid)){
        console.log('from get: invalid sid');
        res.clearCookie(sid);      
    }else{
        console.log("valid sid from get");
        

    }
});


app.post("/login",(req,res)=>{
    const userName = req.body.unInput;
       
    if(userName != "dog" && userName){

        const sid = uuid();
        res.cookie('sid',sid);
        data.sidList[sid] = sid;
        data.linkUserName2Sid(userName,sid);
        if ( !data.userName2Count[userName]){
            data.userName2Count[userName]=0;
        }
        if ( !data.userName2secretWord[userName]){
            data.userName2secretWord[userName]=data.pickWord(words);
        }
       
        console.log(`Secret Word: ${userName2secretWord[userName]}`);
        console.log("This is username: "+userName + " This is sid: "+data.userName2sidList[userName]);
        res.redirect('/');       
    }
    else{
        res.status(401).send(`Can not be dog or null<br>Go back to http://localhost:${PORT}`);
    }

});


app.post("/guess",(req,res)=>{
    
    const sid = req.cookies.sid;    
    const userName = data.getKeyByValue(userName2sidList, sid);
    console.log(`userName: ${userName}, sid: ${sid}`);
    if ( !data.userName2secretWord[userName]){
        data.userName2secretWord[userName] = data.pickWord(words);
    }
    
    const guess = req.body.guessInput;
    data.userName2LastGuess[userName] = guess;
    console.log(`my secret word is: ${data.userName2secretWord[userName]}`);
    console.log(`my guess is: ${guess}`);
    res.redirect('/');
    
})


app.post("/new-game",(req,res)=>{
    const sid = req.cookies.sid;    
    const userName = data.getKeyByValue(userName2sidList, sid);
    data.userName2Count[userName] = 0;
    data.userName2LastGuess[userName] = '';
    data.userName2GuessHistory[userName] ='';
    data.userName2secretWord[userName] = data.pickWord(words);
    res.redirect('/');

    
})


app.post("/logout", (req,res)=>{
    const sid = req.cookies.sid;
    data.deleteSid(sid);
    res.clearCookie('sid');
    res.redirect('/');
});





app.listen(PORT, ()=> console.log(`listening on http://localhost:${PORT}`));

