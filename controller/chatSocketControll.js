module.exports = function(io)
{
    io.on("connection",(socket)=>{
        
        console.log("user connected");
        if(socket.request.session.username)
        {
            const username = socket.request.session.username;
            
            let msg = "connected. Welcome";
            if(socket.request.session.language == "croatian")
            {
                msg = "se pridružuje. Pozdrav ";
            }
            io.emit("greet", `${username} ${msg} ${username}`);

            socket.on("message", (data)=>{
                io.emit("message", data);
            })
    
            socket.on("disconnect", ()=>{
                io.emit("greet", username + " disconnected");
                console.log("user disconnected");
            })
        }

        
    });


}

