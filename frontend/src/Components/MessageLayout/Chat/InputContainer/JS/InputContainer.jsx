import React from "react";
import classes from "../CSS/InputContainer.module.css";
import SendIcon from "@mui/icons-material/Send";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

const InputContainer = ({ getMsg }) => {
  const textRef = useRef();
  const sendMsg = () => {
    if (textRef.current.value.length > 0) {
      getMsg(textRef.current.value);
    }
  };
  return (
    <div className={classes.InputContainer}>
      <div className={classes.InputContainer_Inputs}>
        <input
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMsg();
              e.target.value = "";
            }
          }}
          ref={textRef}
          type="text"
          placeholder="Type here ...."
        />
      </div>
      <div className={classes.InputContainer_Send} onClick={() => sendMsg()}>
        <SendIcon className={classes.InputContainer_SendIcon} />
      </div>
    </div>
  );
};

export default InputContainer;
