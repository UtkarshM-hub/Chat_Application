let socket=undefined;
let io=require("socket.io-client").io;

module.exports={
    init:(route)=>{
        socket=io(route);
        return socket;
    },
    getSocket:()=>{
        if(socket===undefined){
            socket=io("http://localhost");
            return socket;
        }
        return socket;
    },
}
