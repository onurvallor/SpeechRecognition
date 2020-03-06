window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
const transcript_element = document.getElementById("transcript");
const talk_btn = document.getElementById("talk");
const end_btn = document.getElementById("end");

let p = document.createElement("p");
transcript_element.appendChild(p);

recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
    .map(result => result[0]).map(result => result.transcript).join("");

    console.log(transcript);
    p.textContent = transcript;
    if(e.results[0].isFinal){
        p = document.createElement("p");
        p.textContent = transcript;
        transcript_element.appendChild(p);
        p.textContent = "";

        if(transcript.includes("weather")){
            let command = document.createElement("p");
            command.classList.add("command");
            command.textContent = "Getting Weather..."

            transcript_element.appendChild(command);
        }
        if(transcript.includes("how are you")){
            let command = document.createElement("p");
            command.classList.add("command");
            command.textContent = "I am good, how are you?";
            
            transcript_element.appendChild(command)
        }
        
    }
});



recognition.addEventListener("end", () => {
    end_btn.disabled = true;
    talk_btn.disabled = false;
});
talk_btn.addEventListener("click", () => {
    end_btn.disabled = false;
    talk_btn.disabled = true;
    recognition.start();
});
// recognition.start();

end_btn.addEventListener("click", () => {
    end_btn.disabled = true;
    talk_btn.disabled = false;
    recognition.stop();
});