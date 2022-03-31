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