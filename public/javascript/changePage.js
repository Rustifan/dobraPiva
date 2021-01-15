
const pages = document.querySelectorAll(".pages>a");


for(let page of pages)
{
    
    page.addEventListener("click", (event)=>{

        const url = new URL(window.location.href);
        const searchParams = url.searchParams;
        let currentPage = parseInt(searchParams.get("page"));
        if(!currentPage){currentPage = 1;}
        

        const className = page.className;
        const pageReg = new RegExp("^page");
        if(className.search(pageReg)!==-1)
        {
            const pageNumber = className.replace("page","");
            searchParams.set("page", pageNumber);
            window.location.search = searchParams;
        }
        
        else if(className.localeCompare("next")===0)
        {
            currentPage++;
            searchParams.set("page", currentPage);
            window.location.search = searchParams;
        
        }
        else if(className.localeCompare("before")===0)
        {
            currentPage--;
            searchParams.set("page", currentPage);
            window.location.search = searchParams;
        }
        else if(className.localeCompare("last")===0)
        {
            searchParams.set("page",lastPage);
            window.location.search = searchParams;
        }
        else if(className.localeCompare("first")===0)
        {
            searchParams.set("page",1);
            window.location.search = searchParams;
        }
        
        event.preventDefault();
        
        
    })
}
