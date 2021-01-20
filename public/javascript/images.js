
const images = document.querySelectorAll(".image");
const imageContainer = document.querySelector(".images");
const pictures = document.querySelectorAll(".picture");
const handles = document.querySelectorAll(".leftArrow, .rightArrow");

imageContainer.addEventListener("mouseenter",(event)=>{
    handles[0].style.display = "block";
    handles[1].style.display = "block";

})

imageContainer.addEventListener("mouseleave",(event)=>{
    handles[0].style.display = "none";
    handles[1].style.display = "none";
})

const width = parseInt(window.getComputedStyle(imageContainer).width.replace("px"));


for(picture of pictures)
{
    const natWidth = picture.naturalWidth;
    const natHeight = picture.naturalHeight;
    if(natWidth>=natHeight)
    {
        picture.style.width = "100%";
        
    }
    else{
        const ratio = natHeight/natWidth;
        const width = 100/ratio;
        console.log(width);
        picture.style.width = width.toString + "%";
    }
}


function moveImages(imageIndex)
{
    for(let i = 0; i < images.length; i++)
    {
        const image = images[i];
        const offset = width * imageIndex;
        image.style.transform = `translateX(${width*i-offset}px)`;
        
    }   
}
let displayPicture = 0;
moveImages(displayPicture);

for(image of images)
{   
    
    image.style.transition = "transform 1s";
    image.style.display = "flex";
    
}


function moveLeft()
{
    displayPicture--;
    if(displayPicture < 0)
    {
        displayPicture = images.length-1;
    }
    moveImages(displayPicture);
}

function moveRight()
{
    displayPicture++;
    if(displayPicture >= images.length)
    {
        displayPicture = 0;
    }
    moveImages(displayPicture);
}


