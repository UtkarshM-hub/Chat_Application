import React, { useState } from "react";
import ChatContainer from "../Components/Chat/ChatContainer/JS/ChatContainer";
import Sidebar from "../Components/Chat/SideBar/Sidebar/JS/Sidebar";

const Chat = () => {
  // Declerations
  const [activeRoom, setActiveRoom] = useState(undefined);

  return (
    <ChatContainer>
      <Sidebar ActiveRoom={setActiveRoom} />
    </ChatContainer>
  );
};

export default Chat;
