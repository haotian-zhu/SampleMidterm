const userName2sidList = {};
const userName2LastGuess = {};
const userName2secretWord = {};
const userName2Count = {};
const userName2GuessHistory={};
const sidList = {};


function linkUserName2Sid(username,sid){
    userName2sidList[username] = sid;
}


function deleteSid(sid){
    delete userName2sidList[sid];
}


function isSidValid(sid){
    return sidList[sid];

}


function compare( word, guess ) {  

    let word1 = word.toUpperCase();
    let guess1 = guess.toUpperCase();
    let count = 0;
     for (let i = 0; i < word1.length; i ++) {
      for (let j = 0; j < guess1.length; j ++) {
          if (word1.charAt(i) === guess1.charAt(j)){
            count++;
            guess1 = guess1.replace(guess1.charAt(j), "");
            break;
          }   
     }         
     } return count;
    
    }


    function pickWord(wordList) {
    return wordList[Math.floor(Math.random() * wordList.length)];
    }


function handleGame(secretWord,guess,userName){
         if(!guess){
            return '';
        } 
        if(guess != secretWord){
            if(!userName2GuessHistory[userName]){
                userName2GuessHistory[userName]= '';
            }
            let match = data.compare(secretWord,guess);
            userName2GuessHistory[userName] +=`<br>${guess}: ${match} letter(s) match`;
            userName2LastGuess[userName] = guess;
            userName2Count[userName] +=1;
            return `<label> Wrong Guess! Please try again<br>`
            +`You Have Made ${userName2Count[userName]} Wrong Guess(es) So Far<br>`
            +`Your Last Guess Was "${userName2LastGuess[userName]}"</label>`
            +`<label id = "guessHistory" class = "guessHistory">Guess History${userName2GuessHistory[userName]}`
            +'</label>'
                                
        }if(guess === secretWord){
            return `<label>Congratulations, ${userName}, Your Answer "${guess}" is Correct!</label>`;
            
        }       
    }


function changeGuessButton(secretWord, guess){
        if (secretWord == guess && guess){
            return `<button type = "submit" disabled name = "guessButton" id= "guessButton">You Won!</button>`;
        }else{
            return `<button type = "submit" name = "guessButton" id= "guessButton" >Make A Guess!</button>`;
        }
    }


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}


function showWordList(json) {

        let listEl = `<ul class = "words">`;
        for(let i = 0; i<json.length; i++) { 
                                               
            listEl += (json[i]+" ");
            
        }
        listEl+=`</ul>`;
        return listEl;
        }
            
      
const data = {
    userName2sidList,
    sidList,
    userName2LastGuess,
    userName2secretWord,
    userName2GuessHistory,
    userName2Count,
    linkUserName2Sid,
    deleteSid,
    isSidValid,
    compare,
    pickWord,
    handleGame,
    changeGuessButton,
    getKeyByValue,
    showWordList
}
module.exports = data;