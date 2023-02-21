// This is 'script.js' File of Connect - A JS File containing all other required js information

// Today's Time, Day and Date
const today = new Date();

// Get the current time as a string
const hours = today.getHours().toString().padStart(2, '0');
const minutes = today.getMinutes().toString().padStart(2, '0');
const time = `${hours}:${minutes}`;

// Get the current date as a string
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, '0');
const date = today.getDate().toString().padStart(2, '0');
const dateString = `${date}-${month}-${year}`;

document.getElementById('date-time').innerHTML = time + ", " + dateString;

// Copy to Clipboard function - Meeting Room ID
function roomID() {
    
    const copyText = document.getElementById("roomId");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    
    alert("Meeting Room ID Copied: " + copyText.value);
}

// Copy to Clipboard function - Meeting Room URL
function roomURL() {
    
    const copyText = document.getElementById("roomURL");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    alert("Meeting Link Copied: " + copyText.value);
}