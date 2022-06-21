const app=require('express')(); 
const http=require('http').createServer(app); 
const io=require('socket.io')(http,{ 
    cors:{origin:"*"} 
}) 
let user={} 
const port=process.env.PORT||3000; 
io.on('connection',(client)=>{ 
    client.on("join",(name)=>{ 
        user[client.id]=name 
        client.emit("update","You have connect to the server") 
        client.broadcast.emit("update",name+"has joined") 
        io.sockets.emit("update-people",user) 
    }); 
    client.on('send',message=>{ 
        io.sockets.emit("chat",user[client.id],message,new Date()) 
    }); 
    client.on("disconnect",()=>{ 
        io.sockets.emit("update",user[client.id]+"has left") 
        delete user[client.id] 
        io.sockets.emit("update-people",user) 
    }) 
}) 
http.listen(port,()=>{ 
    console.log("Connected") 
})