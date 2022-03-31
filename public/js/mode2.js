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
            text : "you",
            icon : "pleading-face.png"
        },
    
        {
            text : "i am",
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
            text : "uwu",
            icon : "pleading-face.png"
        },
        {
            text : "UwU",
            icon : "pleading-face.png"
        },
    ],

    "question" : [
        {
            text : "why",
            icon : "pleading-face.png"
        },
    ],

    "alphabet" : [
        {
            text : "z",
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
const sentenceTiles = document.querySelector('#user-sentence .sentence-tiles');
const senderSentenceTiles = document.querySelector('#sender-sentence .sentence-tiles');
const wordTileTemplate = document.querySelector('#word-tile-template');
const categoryTiles = document.querySelectorAll('.category-tile');

const speakButton = document.querySelector('.speak-btn');
const clearButton = document.querySelector('.clear-btn');

let sentence = [];

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */

function getWordInfo(requiredWord){
    for( let cat in words){
        let res = words[cat].filter( word => word.text == requiredWord);

        if( res.length != 0){
            return {word : res[0], category : cat };
        }
    }
    return {word : { text : "dummy", icon : "https://img.icons8.com/emoji/48/000000/waving-hand-emoji.png"}, category : "time"}
}

function textToSpeech(text){
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
}

function addTileToSentence(tileElement){
    if( sentence.length >= 7){
        return;
    }
    let tile = tileElement.cloneNode(true);
    let wordText = tile.querySelector('span').textContent.toLowerCase();

    let wordObj = {
        word : wordText,
        icon : tile.querySelector('img').src
    }

    sentence.push(wordObj);

    textToSpeech(wordText);

    sentenceTiles.appendChild(tile);

    transmitMessage(JSON.stringify([wordObj]));
}



function renderSenderSentence(msg){
    senderSentenceTiles.innerHTML = "";
    let senderSentence = "";
    let senderWords = JSON.parse(msg);

    //console.log("rendering : ", msg);

    for(let senderWord of senderWords){

        //console.log("testing for word :", senderWord);

        let { word, category } = getWordInfo(senderWord.word);

        let tile = renderWordTile(word, category);

        //console.log("tile element : ", tile);
        senderSentence += " " + senderWord.word;
        senderSentenceTiles.appendChild(tile);
    }

    textToSpeech(senderSentence);
}

function speakSentence(){
    if( sentence.length == 0 )
        return;
    
    let sentenceText = "";
    for(let ele of sentence){
        sentenceText += " " + ele.word;
    }

    textToSpeech(sentenceText);
    transmitMessage(JSON.stringify(sentence));
}

function clearSentence(){
    sentenceTiles.innerHTML = "";
    sentence = [];
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

window.onload = () => {
    renderWordTray('default');
}
