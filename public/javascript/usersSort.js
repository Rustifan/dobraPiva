const urlParams = new URLSearchParams(window.location.search);

let sortCategory = urlParams.get("sortCategory") || "username";
let sortOrder = urlParams.get("sortOrder") || 1;
sortOrder = parseInt(sortOrder);
let page = urlParams.get("page") || 1;
page = parseInt(page);
let serach = urlParams.get("search") ||  "";
const clickSort = document.querySelectorAll(".clickSort");
const pageAnchors = document.querySelectorAll(".pages>a");

const selectedSort = document.querySelector(".template > ."+sortCategory);
selectedSort.style.fontWeight = "bold";




for(let click of clickSort)
{
    
    click.addEventListener("click", (event)=>{
        const newCategory = click.className.replace(" clickSort", "");
        if(newCategory === sortCategory)
        {
            sortOrder = -sortOrder;
        }
        else if(newCategory==="numberOfComments" || newCategory==="lastTimeActive")
        {
            sortOrder = -1;
        }
        else{
            sortOrder = 1;
        }
        sortCategory = newCategory;
        urlParams.set("sortCategory", sortCategory);
        urlParams.set("sortOrder", sortOrder);
        window.location.search = urlParams;


    });
}

for(let anchor of pageAnchors)
{
    anchor.addEventListener("click", (event)=>{

        if(anchor.className ==="first")
        {
            page = 1;
        }
        else if(anchor.className ==="next")
        {
            page++;
        }
        else if(anchor.className ==="before")
        {
            page--;
        }
        else if(anchor.className ==="last")
        {
            page = numOfPages;
        }
        else
        {
            page = anchor.className.replace("page","");
        }

        urlParams.set("page", page);
        window.location.search = urlParams;
        event.preventDefault();
    })
    
    
    
}









