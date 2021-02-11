const languageBtn = document.querySelector(".languageBtn");
const languageDiv = document.querySelector(".languageDiv");

const en = document.querySelector(".en");
const hr = document.querySelector(".hr");

const languageBtnRect = languageBtn.getBoundingClientRect();

let showLang = false;

languageBtn.addEventListener("click",(event)=>{
   
    showLang = !showLang;

    event.preventDefault();
    
    if(showLang)
    {
       

        languageDiv.style.transition = "1s";
        languageDiv.style.transform = "scale(1)";
       
        

        
    }
    else{
        
        languageDiv.style.transition = "1s";
        languageDiv.style.transform = "scale(0)";

       
    }
    


})

en.addEventListener("click",(event)=>{
   window.location.href = "/en";  
})

hr.addEventListener("click", (event)=>{
    window.location.href = "/hr";
})