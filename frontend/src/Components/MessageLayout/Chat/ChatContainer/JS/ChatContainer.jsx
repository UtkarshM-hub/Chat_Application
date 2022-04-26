import React, { useEffect, useState } from "react";
import classes from "../CSS/ChatContainer.module.css";
import { useSelector } from "react-redux";
import MessageContainer from "../../MessageContainer/JS/MessageContainer";

const ChatContainer = ({
  CurrentConversatsionId,
  showForward,
  setForwardMessage,
}) => {
  const [Message, setMessage] = useState({});
  const state = useSelector((state) => state);
  useEffect(() => {
    if (CurrentConversatsionId !== undefined && state.Messages !== undefined) {
      const array = state.Messages.findIndex(
        (item) => item._id === CurrentConversatsionId
      );
      if (array !== -1) {
        setMessage(state.Messages[array]);
      }
      if (array === -1) {
        setMessage({});
      }
    }
  }, [CurrentConversatsionId, state.Messages]);
  return (
    <div className={classes.ChatContainer}>
      <div className={classes.ChatContainer_ScrollPane}>
        {Message._id !== undefined &&
          Message.messages.map((item) => (
            <MessageContainer
              key={Math.random().toString()}
              style={{ color: "white" }}
              from={item.from}
              message={item.message}
              showForward={showForward}
              setForwardMessage={setForwardMessage}
            />
          ))}
      </div>
    </div>
  );
};

export default ChatContainer;
