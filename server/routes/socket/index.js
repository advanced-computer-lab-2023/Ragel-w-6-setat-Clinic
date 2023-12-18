const io= require('socket.io')(8900,{
    cors:{
        origin:'http://localhost:3000',
    },
});


let users =[];
const addUser = (userId, socketId) => {
    if(!users.some((user) => user.userId === userId)){
        users.push({userId, socketId});
    }
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
}

io.on("connection", (socket) => {
    // when connect
    console.log("a user connected");
    // take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users); 
        console.log("users", users);
    });


    // send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        console.log("user", user);
        io.to(user?.socketId).emit("getMessage", {
            senderId,
            text,
        });
    });

//listen to new conversation
socket.on("newConversation", (data) => {
    // Check if patientId is not null before emitting the event
    if (data && data.patientId) {
      io.to(data.patientId).emit("newConversation", data.conversation);
    }
  });


    // when disconnect
    socket.on("disconnect",()=>
    {
        console.log("a user disconnected")
        removeUser(socket.id);
        io.emit("getUsers", users);
        });
});