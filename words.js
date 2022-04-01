/* -------------------------------------------------------------------------- */
/*                             CONSTANTS AND DATA                             */
/* -------------------------------------------------------------------------- */

const IMG_LINK_PREFIX = "https://img.icons8.com/emoji/48/000000/"
const colors = "https://img.icons8.com/color/48/000000/"
const fluency = "https://img.icons8.com/fluency/48/000000/"

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
            icon : "pleading-face.png",
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
            icon : "youtube-squared.png"
        },
        
        {
            text : "i am",
            icon : "i-pronoun.png"
        },
        
        {
            text : "mine",
            icon : "mine-pronoun.png"
        },
        
        {
            text : "they",
            icon : "they.png"
        },
        
        {
            text : "he",
            icon : "he.png"
        },
        
        {
            text : "we",
            icon : "we.png"
        },
    ],

    "time" : [  
        
        {
            text : "now",
            icon : "time.png"
        }

    ],

    "action" : [
        
        {
            text : "work",
            icon : "work.png"
        },
        
        {
            text : "play",
            icon : "https://img.icons8.com/flat-round/64/000000/play--v1.png"
        },
        
        {
            text : "have",
            icon : "https://img.icons8.com/ios-filled/50/000000/h.png"
        },
        
        {
            text : "stop",
            icon : "https://img.icons8.com/external-those-icons-lineal-color-those-icons/48/000000/external-stop-traffic-road-signs-those-icons-lineal-color-those-icons.png"
        },
        
        {
            text : "read",
            icon : "https://img.icons8.com/external-victoruler-flat-victoruler/64/000000/external-read-education-and-school-victoruler-flat-victoruler.png"
        },
        
        {
            text : "write",
            icon : "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-write-customer-feedback-flaticons-lineal-color-flat-icons.png"
        },
        
        {
            text : "fast",
            icon : "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-write-customer-feedback-flaticons-lineal-color-flat-icons.png"
        },
        
        {
            text : "slow",
            icon : "https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-backward-user-interface-kmg-design-flat-kmg-design.png"
        },

    ],

    "adjective" : [
        {
            text : "happy",
            icon : "grinning-face-with-big-eyes--v2.png"
        },
        {
            text : "sad",
            icon : "sad--v1.png"
        },
        {
            text : "tired",
            icon : "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-tired-comfort-flaticons-lineal-color-flat-icons-2.png"
        },
        {
            text : "good",
            icon : "https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/000000/external-good-customer-review-xnimrodx-lineal-color-xnimrodx.png"
        },
        {
            text : "sleepy",
            icon : "sleeping.png"
        },
    ],

    "emoji" : [
        {
            text : "like",
            icon : "https://img.icons8.com/cute-clipart/64/000000/like.png"
        },
        {
            text : "feel",
            icon : "https://img.icons8.com/external-tulpahn-outline-color-tulpahn/64/000000/external-emoji-birthday-party-tulpahn-outline-color-tulpahn.png"
        },
        {
            text : "like",
            icon : "https://img.icons8.com/cute-clipart/64/000000/like.png"
        },
        {
            text : "help",
            icon : "hand.png"
        },
        {
            text : "like",
            icon : "hand.png"
        },
        {
            text : "please",
            icon : "pleading-face.png"
        },
    ],

    "question" : [
        {
            text : "why",
            icon : "why-quest.png"
        },
        {
            text : "what",
            icon : "https://img.icons8.com/external-bearicons-flat-bearicons/64/000000/external-What-miscellany-texts-and-badges-bearicons-flat-bearicons.png"
        },
    ],

    "alphabet" : [
        {
            text : "a",
            icon : "pleading-face.png",
            code : "&#65;"
        },
        {
            text : "b",
            icon : "pleading-face.png",
            code : "&#66;"
        },
        {
            text : "c",
            icon : "pleading-face.png",
            code : "&#67;"
        },
        {
            text : "d",
            icon : "pleading-face.png",
            code : "&#68;"
        },
        {
            text : "e",
            icon : "pleading-face.png",
            code : "&#69;"
        },
        {
            text : "f",
            icon : "pleading-face.png",
            code : "&#70;"
        },
        {
            text : "g",
            icon : "pleading-face.png",
            code : "&#71;"
        },
        {
            text : "h",
            icon : "pleading-face.png",
            code : "&#72;"
        },
        {
            text : "i",
            icon : "pleading-face.png",
            code : "&#73;"
        },
        {
            text : "j",
            icon : "pleading-face.png",
            code : "&#74;"
        },
        {
            text : "k",
            icon : "pleading-face.png",
            code : "&#75;"
        },
        {
            text : "l",
            icon : "pleading-face.png",
            code : "&#76;"
        },
        {
            text : "m",
            icon : "pleading-face.png",
            code : "&#77;"
        },
        {
            text : "n",
            icon : "pleading-face.png",
            code : "&#78;"
        },
        {
            text : "o",
            icon : "pleading-face.png",
            code : "&#79;"
        },
        {
            text : "p",
            icon : "pleading-face.png",
            code : "&#80;"
        },
        {
            text : "q",
            icon : "pleading-face.png",
            code : "&#81;"
        },
        {
            text : "r",
            icon : "pleading-face.png",
            code : "&#82;"
        },
        {
            text : "s",
            icon : "pleading-face.png",
            code : "&#83;"
        },
        {
            text : "t",
            icon : "pleading-face.png",
            code : "&#84;"
        },
        {
            text : "u",
            icon : "pleading-face.png",
            code : "&#85;"
        },
        {
            text : "v",
            icon : "pleading-face.png",
            code : "&#86;"
        },
        {
            text : "w",
            icon : "pleading-face.png",
            code : "&#87;"
        },
        {
            text : "x",
            icon : "pleading-face.png",
            code : "&#88;"
        },
        {
            text : "y",
            icon : "pleading-face.png",
            code : "&#89;"
        },
        {
            text : "z",
            icon : "pleading-face.png",
            code : "&#90;"
        },
    ],

    "number" : [
        {
            text : "0",
            icon : "keycap-digit-zero-emoji.png"
        },
        {
            text : "1",
            icon : "keycap-digit-one-emoji.png"
        },
        {
            text : "2",
            icon : "keycap-digit-two-emoji.png"
        },
        {
            text : "3",
            icon : "keycap-digit-three-emoji.png"
        },
        {
            text : "4",
            icon : "keycap-digit-four-emoji.png"
        },
        {
            text : "5",
            icon : "keycap-digit-five-emoji.png"
        },
        {
            text : "6",
            icon : "keycap-digit-six-emoji.png"
        },
        {
            text : "7",
            icon : "keycap-digit-seven-emoji.png"
        },
        {
            text : "8",
            icon : "keycap-digit-eight-emoji.png"
        },
        {
            text : "9",
            icon : "keycap-digit-nine-emoji.png"
        },
    ]

}