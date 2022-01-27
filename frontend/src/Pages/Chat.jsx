import React, { useEffect, useState } from "react";
import ChatContainer from "../Components/ChatContainer/JS/ChatContainer";
import MessagesContainer from "../Components/MessagesContainer/JS/MessagesContainer";
import Sidebar from "../Components/SideBar/JS/Sidebar";
import { getSocket } from "../socket";
import { useDispatch } from "react-redux";
import { chatAction } from "../store/store";

const Chat = () => {
  const Socket = getSocket();
  const dispatch = useDispatch();
  const [activeGroup, setActiveGroup] = useState(undefined);
  const [messages, setMesssages] = useState(undefined);
  useEffect(() => {
    if (activeGroup !== undefined) {
      Socket.emit("ConnectedToConvo", { id: activeGroup });
      Socket.on("EnteredGroup", (message) => {
        dispatch(chatAction.addToChat({ name: activeGroup }));
      });
    }
  }, [activeGroup]);

  return (
    <ChatContainer>
      <Sidebar getActive={setActiveGroup} />
      <MessagesContainer Entered={messages} />
    </ChatContainer>
  );
};

export default Chat;
