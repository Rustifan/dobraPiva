const menuButton = document.querySelector(".container");
const menuBars = document.querySelectorAll(".bars");
const menu = document.querySelector(".navMain");
const userIcon = document.querySelector(".userIcon");
const userMenu = document.querySelector(".userSettings");

let menuOpen = false;

menuButton.addEventListener("click", (event)=>{ 
    
    menuOpen = !menuOpen;
    if(menuOpen)
    {   
        menu.style.transition = "max-height 1s"
        menu.style.maxHeight = "1000px";
        menuBars[0].style.transform = "rotate(-45deg) translate(-9px, 6px)";
        menuBars[1].style.opacity = "0";
        menuBars[2].style.transform = "rotate(45deg) translate(-9px, -6px)";

    }
    else{
        menu.style.transition = "max-height 0.2s"
        menuBars[1].style.opacity = "100%";

        menu.style.maxHeight = "50px";
        menuBars[0].style.transform = "rotate(0deg)";
        menuBars[2].style.transform = "rotate(0deg)";
    }
})

let userMenuOpen = false;

userIcon.addEventListener("click", (event)=>{
    userMenuOpen = !userMenuOpen;
    
    userIcon.className = "userIcon animatedIcon";
    if(userMenuOpen)
    {

        userMenu.style.transition = "max-height 1s"
        
        userMenu.style.maxHeight = "1000px";
    }
    else
    {
        userMenu.style.transition = "max-height 0.2s"

        userMenu.style.maxHeight = "50px";
    }

})

userIcon.addEventListener("animationend",(event)=>{
    userIcon.className = "userIcon";
})