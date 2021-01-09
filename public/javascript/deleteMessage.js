const x = document.querySelector("p.removeFlash");

if(x)
{
    x.addEventListener("click", (event)=>{
        x.parentNode.parentNode.removeChild(x.parentNode);
        
    })
}
