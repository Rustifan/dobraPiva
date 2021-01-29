const socket = io();

const sendForm = document.querySelector(".sendForm");
const input = document.querySelector(".sendForm>input");
const chat = document.querySelector(".chat");

if(!username)
{
    username = "guest";
}


sendForm.addEventListener("submit",(event)=>{

    event.preventDefault();
    
    if(input.value)
    {
        const data = {sender: username, value: input.value};
        socket.emit("message", data);
        input.value = "";
    }
    

})





socket.on("message", (data)=>{

    const messageContainer = document.createElement("div");
    messageContainer.className = "message";
    const message = document.createElement("p");
    message.className="messageText";
    const messageSender = document.createElement("p");
    messageSender.className ="messageSender";
    messageSender.textContent = data.sender + ":";
    messageContainer.appendChild(messageSender);
    messageContainer.appendChild(message);
    message.textContent = data.value;
    chat.appendChild(messageContainer);
    chat.scrollTop = chat.scrollHeight-chat.clientHeight;
})


