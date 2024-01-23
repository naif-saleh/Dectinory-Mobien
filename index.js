
const selectag = document.querySelectorAll("select"),
translateBtn = document.querySelector(".btn"),
from_text = document.querySelector(".from-text"),
exchange_icon = document.querySelector(".exchange"),
to_text = document.querySelector(".to-text"),
icons = document.querySelectorAll(".row i");

selectag.forEach((tag , id) =>{
    for(const county_code in countries){
        let selected;
        if(id == 0 && county_code == "En-EN"){
            selected="selected";
        }else if(id == 1 && county_code == "Fr-FR"){
            selected = "selected";
        }
        let option = `<option value="${county_code} ${selected}">${countries[county_code]}</option>`;
        tag.insertAdjacentHTML("beforeend" , option);
    }
});

icons.forEach(icon =>{
    icon.addEventListener("click",({target})=>{
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                navigator.clipboard.writeText(from_text.value)
            }else{
                navigator.clipboard.writeText(to_text.value)
            }
        }else{
            let speech;
            if(target.id == "from"){
                speech = new SpeechSynthesisUtterance(from_text.value)
            }else{
                speech = new SpeechSynthesisUtterance(to_text.value)
            }
            speechSynthesis.speak(speech)
        }    
    })

    
})




exchange_icon.addEventListener("click",()=>{
   let temp_value = from_text.value;
    from_text.value = to_text.value;
    to_text.value = temp_value;

});


translateBtn.addEventListener("click",()=>{
    let text=from_text.value,
    translateFrom = selectag[0].value,
    translateTo = selectag[1].value;
    
    if(!text) return;
        to_text.setAttribute('placeholder','Translating...')

    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data =>{
        to_text.value = data.responseData.translatedText;
        to_text.setAttribute('placeholder','Translation')
    });


});


