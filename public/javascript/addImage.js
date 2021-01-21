const addImageForm = document.querySelector(".addImageForm");
const addImageInput = document.querySelector(".addImageInput");
const deleteButton = document.querySelector(".deleteButton");
const deleteForm = document.querySelector(".deleteForm");
const backButton = document.querySelector(".backButton");

backButton.onclick = ()=>
{
    const backUrl = window.location.href.replace("/images","");
    window.location.href = backUrl;
}

if(deleteButton)
{
    deleteButton.onclick = ()=>
    {
        deleteForm.submit();
        deleteButton.onclick = null;
    }
}



console.log(addImageForm);

addImageInput.onchange = ()=>
{
    addImageForm.submit();
    addImageInput.onchange = null;
    addImageInput.onclick = null;
}