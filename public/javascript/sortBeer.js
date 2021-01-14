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
        else {
            sortCategoryIndex = i;
            sortOrder = 1;
            
        }

        if (window.location.href.indexOf("/find") === -1) 
        {
            const indexOfPage = window.location.href.indexOf("?page");
            if(indexOfPage !==-1)
            {
                const pageSubstr = window.location.href.substr(indexOfPage,window.location.href.lenght);
                let newHref = window.location.href.substr(0, pageSubstr);
                
                newHref+="beer/find?q=&category"+"&sortCategory=" + sortCategoryIndex +
                "&sortOrder=" + sortOrder+"&"+pageSubstr.substr(1, pageSubstr.length);
                
                window.location.href = newHref;
            }
            else{
                window.location.href += "/find?q=&category"+"&sortCategory=" + sortCategoryIndex +
            "&sortOrder=" + sortOrder;
            }
            

            
        }
        else {
            const index = window.location.href.indexOf("&sortCategory=");
            const indexOfPage = window.location.href.indexOf("&page");
            const pageString = window.location.href.substr(indexOfPage, window.location.href.length);

            if (index !== -1) {
                const newString = window.location.href.substr(0, index);
                window.location.href = newString + "&sortCategory=" + sortCategoryIndex +
                    "&sortOrder=" + sortOrder;
            }
            else {
                window.location.href += "&sortCategory=" + sortCategoryIndex +
                    "&sortOrder=" + sortOrder;
            }
        }







    })
}

