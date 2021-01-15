const ratings = document.querySelectorAll(".rate>div");
const rateForm = document.querySelector(".rate");
const radioInputs = document.querySelectorAll("input[type=radio]");
const ratingForm = document.querySelector(".ratingForm");

let clicked = 0;

if(rateForm)
{
    for(let i = 0; i<ratings.length; i++)
{
    //mouse over
   
    ratings[i].addEventListener("mouseenter", function(event){
        for(let j=0; j<ratings.length; j++)
        {
            if(j<=i)
            {
                ratings[j].style.opacity = "1";
            }
            else{
                if(j<clicked)
                {
                    ratings[j].style.opacity = "0.7";
                    
                }
                else{
                    ratings[j].style.opacity = "0.2";

                }
            }
            

            
        }
        
    });

    ratings[i].addEventListener("click", (event)=>{
        clicked = i+1;
        radioInputs[i].checked = true;
        for(let j = i+1; j<ratings.length; j++)
        {
            ratings[j].style.opacity = "0.2";
        }
        rateForm.style.border = "none";

        ratingForm.submit();

    })

}

rateForm.addEventListener("mouseleave",(event)=>{
    for(let i = 0; i < clicked; i++)
    {
        ratings[i].style.opacity = "1";

    }
    for(let i = clicked; i<ratings.length; i++)
    {
        ratings[i].style.opacity = "0.2";
    }
})


}


