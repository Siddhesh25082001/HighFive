

var isBrowserSupported;
if ("webkitSpeechRecognition" in window) {
    isBrowserSupported = true;
} else {
    alert('Browser does not supports speech recognition');
}

window.onload = function () {
    if (isBrowserSupported) {
        if (localStorage.getItem("voiceConnected") === null) {
            localStorage.setItem("voiceConnected", true);
            let speech = new SpeechSynthesisUtterance();
            speech.text = "Voice Connected";
            window.speechSynthesis.speak(speech);
        }
    }
}

if (isBrowserSupported) {

    // Creating speech recognition object
    let recognition = new webkitSpeechRecognition();
    let speech = new SpeechSynthesisUtterance();

    // window.speechSynthesis.speak(speech);
    recognition.interimResults = true;

    recognition.onstart = () => {
        // speech.text = "Voice Connected";
        // window.speechSynthesis.speak(speech);
        console.log('Voice is activated');
    }

    recognition.onresult = (e) => {
        let text = Array.from(e.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join("");
        if (e.results[0].isFinal) {
            text = text.toLowerCase();
            console.log(text);
            if (text.includes("voice")) {
                // Click On create
                if (text.includes("click on create")) {
                    console.log("Inside click on create");
                    window.location.href = "http://localhost:8000/createRoom";
                    speech.text = "Clicked on create button";
                    window.speechSynthesis.speak(speech);
                }

                if (text.includes("create room")) {
                    console.log("Inside create room");
                    const copyText = document.getElementById("roomId");
                    //console.log(copyText.value)
                    window.location.href = `/info/${copyText.value}`;
                    speech.text = "Room Created successfully";
                    window.speechSynthesis.speak(speech);
                }

                if (text.includes("on my video")) {
                    console.log("Inside on my video");
                    const video = document.getElementById('videoOption');
                    video.click();
                    speech.text = "Video turned On";
                    window.speechSynthesis.speak(speech);
                }

                if (text.includes("off my video") || text.includes("of my video")) {
                    console.log("Inside off my video");
                    const video = document.getElementById('videoOption');
                    video.click();
                    speech.text = "Video turned Off";
                    window.speechSynthesis.speak(speech);
                }

                if (text.includes("mute me")) {
                    console.log("Inside on my audio");
                    const audio = document.getElementById('audioOption');
                    audio.click();
                    speech.text = "Audio Muted";
                    window.speechSynthesis.speak(speech);
                }

                if (text.includes("unmute me") && text.indexOf("mute") === -1) {
                    console.log("Inside off my audio");
                    const audio = document.getElementById('audioOption');
                    audio.click();
                    speech.text = "Audio Unmuted";
                    window.speechSynthesis.speak(speech);
                }

                if(text.includes("leave meeting") || text.includes("live meeting")){
                    console.log("Inside leave meeting");
                    const leave = document.getElementById('leaveMeeting');
                    leave.click();
                    speech.text = "Meeting Left";
                    window.speechSynthesis.speak(speech);
                 }

                 if(text.includes("submit")){
                     console.log("Inside submit form");
                     const submit = document.getElementById('submit-info');
                     submit.click();
                     speech.text = "Entered Into Meeting";
                     window.speechSynthesis.speak(speech);
                 }

                if (text.includes("share link") || text.includes("share the link")) {
                    console.log("Inside share link");
                    const roomId = document.getElementById('roomId');
                    const link = `http://localhost:8000/room/mode-1/${roomId.value}`;
                    Email.send({
                        Host: "smtp.elasticemail.com",
                        Port: 2525,
                        Username: "shettyrohit268@gmail.com",
                        Password: "961CCBA491B80A118101899A82CBD6217988",
                        To: `prajapatirahul1712001@gmail.com`,
                        From: "shettyrohit268@gmail.com",
                        Subject: "Hello from rahul",
                        Body: `Room Id : ${roomId.value},
                            Link : ${link}`,
                    }).
                    then(
                        message => {
                            console.log(message);
                            speech.text = "Link Shared";
                            window.speechSynthesis.speak(speech);
                        }
                    )
                    .catch(err => { 
                        console.log(err);
                        speech.text = "Some error occured";
                        window.speechSynthesis.speak(speech);
                    });
                }

                if(text.includes("return to home page") || text.includes("home page")){
                    console.log("Inside home page");
                    window.location.href = "http://localhost:8000";
                    speech.text = "Returned to home page";
                    window.speechSynthesis.speak(speech);
                }
            }
            else {
                console.log("voice bolo pehle")
            }
        }
    }

    recognition.onend = () => {
        //console.log('Voice is deactivated');
        recognition.start();
    }

    recognition.start();
    
}

