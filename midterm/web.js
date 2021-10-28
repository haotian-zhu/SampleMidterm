"use strict"
const words = require("./words");
const data = require("./data");
const web = {
    loginPage: function(){
        return `
        <!DOCTYPE html>
<html>
    <head>
        <title>Word Guessing Game</title>
        <link rel = "stylesheet" href="game.css"/>
    </head>

    <body>

        <div id ="login" class = "loginPage active">
            
            <div class = "login">
            <h1>Word Guessing Game</h1>
            <form action ="/login" method= "post" id = "login">
            <input type = "text" name = "unInput" placeholder="Enter Username" required pattern="[A-Za-z0-9]+"/><br>
            <button type = "submit" name = "loginButton">Log In</button>
            </form>
            <label id = "reminder" ></label>
            
          </div>

        </div>
        
    </body>
    
</html>`
    },
    gamePage: function(words,secretWord,guess,userName){
        return `
        <!DOCTYPE html>
<html>
    <head>
        <title>Word Guessing Game</title>
        <link rel = "stylesheet" href="game.css"/>
    </head>

    <body>
        <div id ="gamePage" class = "gamePage active">
            
            <div class ="game">
            <h1 id = "welcome" class = "welcome">Welcome to The Word Guessing Game!</h1>
                
                ${data.showWordList(words)}
                
            
            <form action ="/guess" method= "post" id = "guess">
            <label class = "hint">You Can Only Choose Word From The Above List</label>
            <input type = "text" name = "guessInput" required placeholder="Enter your guess" pattern="[A-Za-z]+" 
            oninvalid="this.setCustomValidity('Enter Characters Only. Must Not Be Null')" oninput="this.setCustomValidity('')"/>
            
            ${data.handleGame(secretWord,guess,userName)}
            
            
            <label id = "gameResult" ></label>
            ${data.changeGuessButton(secretWord, guess)}
            <label ></label>   
            </form>
            <form action ="/new-game" method= "post">    
            <button id = "newGame" name = "newGameButton">Start a New Game!</button>
                </form>
            <form action ="/logout" method= "post"> 
                <label ></label>   
                <button id = "logOut" class = "logoutB" name = "logoutButton">Logout</button>
                </form>
            </div>

        </div>
        
        </body>
    
</html>`

   }
                                           
};

                

module.exports = web;