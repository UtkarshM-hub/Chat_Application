let socket=undefined;
let io;

module.exports={
    init:(route)=>{
        io=require("socket.io-client");
        socket=io(route) ;
        return socket;
    },
    getSocket:()=>{
        return socket;
    }
}

