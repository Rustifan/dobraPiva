module.exports = function(io)
{
    io.on("connection",(socket)=>{
        
        console.log("user connected");
        if(socket.request.session.username)
        {
            const username = socket.request.session.username;
            io.emit("greet", `${username} connencted. Welcome ${username}`);

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

