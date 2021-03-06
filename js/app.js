/*
*   Functions are located here
*/

// Fetch elements in the html
const gameScreen = document.getElementById('game-screen');

//sounds in the game
let clickSound = new Audio('./sounds/clickCut.mp3');
let backgroundMusic = new Audio('./sounds/bgMusicCut.mp3'); 
let correctSound = new Audio('./sounds/correctCut.mp3');
let congratSound = new Audio('./sounds/endingCut.mp3');   

//Lets recreate welcome screen using vanilla javascript
let welcomeScreen = function(){

    /*
    * <div class="welcomeScreen">
    *  <img src="img/test3.png" id="gamelogo" alt="Welcome Logo"> <br>
    *  <button id="start"> <img src="img/play.png"> </button>
    * </div>
    */

    const welcome = document.createElement('div');
    welcome.classList.add('welcomeScreen');

    const img1 = document.createElement('img');
    img1.setAttribute('class','gamelogo');
    img1.setAttribute('alt','Welcome Logo');
    img1.src="img/test3.png"

    const but = document.createElement('button');
    but.setAttribute('id', 'start');

    const img2 = document.createElement('img');
    img2.src="img/play.png"

    const br = document.createElement('br');

    //Append every element to each other
    gameScreen.appendChild(welcome);
    welcome.appendChild(img1);
    welcome.appendChild(br);
    welcome.appendChild(but);
    but.appendChild(img2);

    // call playGame function when clicking a button and hides welcome screen 
    but.addEventListener('click', function(){
        clickSound.play();
        backgroundMusic.play();
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.65;
        welcome.classList.add('hide');
        setTimeout(gameStart, 500);
    });
    

}

// functions that starts a game

let gameStart = function(){

    //Create a section with a class of grid-game
    const gameGrid = document.createElement('section');
    gameGrid.setAttribute('class','grid-game');
    gameScreen.appendChild(gameGrid);

    //lets duplicate the cards array
    let doubleCards = cards.concat(cards);

    //game variables
    let gameCount = 0;
    let firstGuess = '';
    let secondGuess = '';
    let congratsGame = 0;
    let previousClick = null;
    let gameDelay = 1200;

    //create a match function 
    let gameMatch = function(){
        let select = document.querySelectorAll('.selected');
        select.forEach(function(card){
            card.classList.add('match');
        });
    }

    //create a reset function 
    let gameReset = function(){
        gameCount = 0;
        firstGuess = '';
        secondGuess = '';
        previousClick = null;
        
        let select = document.querySelectorAll('.selected');
        select.forEach(function(card){
            card.classList.remove('selected');
        });
    }


    //shuffles the cards every reload of the page
    doubleCards.sort(function(){
        return 0.5 - Math.random();
    });

    //for every items inside the card lets create in html
    doubleCards.forEach(function(item){
        let name = item.name;
        let backgroundImage = `url(${item.img})`;

        const gameCard = document.createElement('div');
        gameCard.classList.add('card');
        gameCard.dataset.name = name;

        const frontCard = document.createElement('div');
        frontCard.classList.add('frontCard');

        const backCard = document.createElement('div');
        backCard.classList.add('backCard');
        backCard.style.backgroundImage = backgroundImage;

        gameGrid.appendChild(gameCard);
        gameCard.appendChild(frontCard);
        gameCard.appendChild(backCard);
    });

    //when clicking each card;
    gameGrid.addEventListener('click', function(e){
        let click = e.target;

        if(!(click.nodeName == 'SECTION' || click == previousClick || click.parentNode.classList.contains('selected') || click.parentNode.classList.contains('match'))){
            if(gameCount < 2){
                gameCount++;
                if(gameCount === 1){
                    firstGuess = click.parentNode.dataset.name;
                    click.parentNode.classList.add('selected');
                }else {
                    secondGuess = click.parentNode.dataset.name;
                    click.parentNode.classList.add('selected');
                }
    
                if(firstGuess !== '' && secondGuess !== ''){
                    if(firstGuess === secondGuess){
                        congratsGame++;
                        correctSound.play();
                        correctSound.volume = 0.3;
                        setTimeout(gameMatch, gameDelay);
                        setTimeout(gameReset, gameDelay);
                    }else {
                        setTimeout(gameReset, gameDelay);
                    }
                }
                previousClick = click;
            } 
            
            if(congratsGame == cards.length){
                setTimeout(gameFinish, 1400);
            }
        }
    });
}

let gameFinish = function(){
    congratSound.play();
    congratSound.volume = 0.45;

    gameScreen.innerHTML = `
        <img src="img/congrats.png" class="gamecongrats"/>
    `;

    backgroundMusic.pause();
}

// Call the function
window.onload = function(){
    welcomeScreen();
}