const beerTitle = document.querySelectorAll(".beerTitle>span>p");

let sortCategoryIndex = null;

switch (sortCategory) {
    case "name":
        sortCategoryIndex = 0;
        break;
    case "rating":
        sortCategoryIndex = 1;
        break;
    case "beerStyle":
        sortCategoryIndex = 2;
        break;
    case "location":
        sortCategoryIndex = 3;
        break;
}

for (let i = 0; i < beerTitle.length; i++) {
    if (i === sortCategoryIndex) {
        beerTitle[i].style.fontWeight = "bold";

    }

    beerTitle[i].style.display = "inline-block";
    beerTitle[i].addEventListener("mouseover", (event) => {

        beerTitle[i].style.cursor = "pointer";

    })

    beerTitle[i].addEventListener("click", (event) => {
        if (sortCategoryIndex === i) {
            sortOrder = -sortOrder;
        }
        else if(i===1)
        {
            sortCategoryIndex = i;
            sortOrder = -1;
        }
        else {
            sortCategoryIndex = i;
            sortOrder = 1;
            
        }
        const href = new URL(window.location.href);
        const searchParams = href.searchParams;
        searchParams.set("sortOrder",sortOrder);
        searchParams.set("sortCategory", sortCategoryIndex);
        window.location.search = searchParams;
        
        
        







    })
}

