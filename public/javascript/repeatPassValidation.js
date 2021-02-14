const password = document.querySelector("input.password");
const repeatPassword = document.querySelector("input.repeatPassword");
const button = document.querySelector("form>button");
const message = document.querySelector("p.repeatPassMessage");



button.addEventListener("click", (event)=>{

    
    if(password.value !== repeatPassword.value)
    {
        password.style.border = "solid 2px red";
        repeatPassword.style.border = "solid 2px red";

        password.addEventListener("input",areTheySame);
        repeatPassword.addEventListener("input", areTheySame);
        message.style.display = "block";
        event.preventDefault();
    }
    
    
})

function areTheySame(event)
{
    if(password.value !== repeatPassword.value)
    {
        password.style.border = "solid 2px red";
        repeatPassword.style.border = "solid 2px red";
        message.style.display = "block";
    }
    else{
        password.style.border = "solid 2px green";
        repeatPassword.style.border = "solid 2px green";
        message.style.display = "none";
    }
}