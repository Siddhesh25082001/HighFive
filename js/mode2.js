/* -------------------------------------------------------------------------- */
/*                             CONSTANTS AND DATA                             */
/* -------------------------------------------------------------------------- */

const IMG_LINK_PREFIX = "https://img.icons8.com/emoji/48/000000/"
let words = {
    "yes" : [
        {
            text : "yes",
            icon : "check-mark-emoji.png"
        },
    ],

    "no" : [
        {
            text : "no",
            icon : "no-entry-emoji.png"
        },
    ],

    "greeting" : [
        {
            text : "hello",
            icon : "victory-hand-emoji.png"
        },
    
        {
            text : "goodbye",
            icon : "waving-hand-emoji.png"
        },
    
        {
            text : "okay",
            icon : "thumbs-up.png"
        },
    
        {
            text : "please",
            icon : "pleading-face.png"
        },
    
        {
            text : "thanks",
            icon : "folded-hands-emoji-1.png"
        },
    
        {
            text : "sorry",
            icon : "white-flag.png"
        },
    ],

    "pronoun" : [
        {
            text : "You",
            icon : "pleading-face.png"
        },
    
        {
            text : "I am",
            icon : "pleading-face.png"
        },
    ],

    "time" : [  
        {
            text : "now",
            icon : "pleading-face.png"
        }
    ],

    "action" : [
        {
            text : "make",
            icon : "pleading-face.png"
        },
    ],

    "adjective" : [
        {
            text : "good",
            icon : "pleading-face.png"
        },
    ],

    "emoji" : [
        {
            text : "UwU",
            icon : "pleading-face.png"
        },
        {
            text : "strong",
            icon : "pleading-face.png"
        },
        {
            text : "good job",
            icon : "pleading-face.png"
        },
    ],

    "question" : [
        {
            text : "Why",
            icon : "pleading-face.png"
        },
    ],

    "alphabet" : [
        {
            text : "Z",
            icon : "pleading-face.png"
        },
    ],

    "number" : [
        {
            text : "0",
            icon : "pleading-face.png"
        },
    ]
}

/* -------------------------------------------------------------------------- */
/*                             SELECTING ELEMENTS                             */
/* -------------------------------------------------------------------------- */


const grid = document.querySelector('.word-tray .grid-container');
const sentenceTiles = document.querySelector('.sentence-tiles');
const wordTileTemplate = document.querySelector('#word-tile-template');
const categoryTiles = document.querySelectorAll('.category-tile');

const speakButton = document.querySelector('.speak-btn');
const clearButton = document.querySelector('.clear-btn');

let sentenceText = "";
let sentenceTilesCount = 0;

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */
function textToSpeech(text){
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
}

function addTileToSentence(tileElement){
    if( sentenceTilesCount >= 7){
        return;
    }
    let tile = tileElement.cloneNode(true);
    sentenceText += " " + tile.querySelector('span').textContent;
    sentenceTilesCount++;

    textToSpeech(tile.querySelector('span').textContent);

    sentenceTiles.appendChild(tile);
    
}

function speakSentence(){
    if( !sentenceText )
        return;
    
    textToSpeech(sentenceText);
}

function clearSentence(){
    sentenceTiles.innerHTML = "";
    sentenceText = "";
    sentenceTilesCount = 0;
}

function clearActiveCategoryTiles(){
    for( let tile of categoryTiles){
        tile.classList.remove('active');
    }
}


function renderWordTile(word, category){
    let tile = wordTileTemplate.content.cloneNode(true);

    tile.querySelector('img').src = IMG_LINK_PREFIX + word.icon;
    tile.querySelector('span').textContent = word.text;
    
    tile.querySelector('div.word-tile').classList.add(category);

    return tile.querySelector('div.word-tile');
}

function renderWordTray(requiredCategory){
    grid.innerHTML = "";
    let requiredCategories;
    if( requiredCategory == 'default' ){
        requiredCategories = ["yes", "no", "greeting", "pronoun", "time"];
    }
    else{
        requiredCategories = [requiredCategory];
    }

    for(let cat of requiredCategories){
        for(let word of words[cat]){
            let tile = renderWordTile(word, cat);

            tile.addEventListener('click', (e) => {
                handleWordTileClick(e.currentTarget);
            });

            grid.appendChild(tile);
        }
    }
}

function handleWordTileClick(currTile){
    addTileToSentence(currTile);
}

function handleCategoryTileClick(currTile){

    if( currTile.classList.contains('active')){
        currTile.classList.remove('active');
        renderWordTray('default');
        return
    }

    clearActiveCategoryTiles();

    currTile.classList.add('active');

    renderWordTray(currTile.id);
}


/* -------------------------------------------------------------------------- */
/*                               EVENT LISTENERS                              */
/* -------------------------------------------------------------------------- */


categoryTiles.forEach( (tile) => {
    tile.addEventListener('click', (e) => {
        handleCategoryTileClick(e.currentTarget);
    });
});

speakButton.addEventListener('click', () => { speakSentence() });
clearButton.addEventListener('click', () => { clearSentence() });


/* -------------------------------------------------------------------------- */
/*                                MAIN FUNCTION                               */
/* -------------------------------------------------------------------------- */

renderWordTray('default');










/*

let output = '';

const grid = document.getElementById("box");
const container = document.getElementById("text");

$(document).click(function(event) {
    var tile = $(event.target);
    if(tile[0].tagName == 'DIV' && tile[0].classList.contains('shadow')){
        
        console.log(tile[0]);
        
        const valueContainer = tile[0].getElementsByClassName('bottom');
        console.log(valueContainer)

        const textContainer = valueContainer[0].getElementsByClassName('textValue');
        console.log(textContainer)

        grid.appendChild(tile[0]);
        container.appendChild(grid)
        
        output += textContainer[0].innerHTML;
        output += ' ';
    }
});

const mic = document.getElementById('speak');
mic.addEventListener('click', function(){
    console.log(output);
    container.innerHTML = "";

    var msg = new SpeechSynthesisUtterance();
    msg.text = output;
    output = '';
    window.speechSynthesis.speak(msg);
})

*/