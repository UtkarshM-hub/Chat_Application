import React, { useRef } from "react";
import classes from "../CSS/InputContainer.module.css";

const InputContainer = () => {
  const inputRef = useRef();
  return (
    <div className={classes.InputContainer}>
      <input
        className={classes.InputContainer_Elements}
        ref={inputRef}
        type="text"
        placeholder="Type Here ....."
      />
      <button
        className={`${classes.InputContainer_sendBtn} ${classes.InputContainer_Elements}`}
      >
        Send
      </button>
    </div>
  );
};

export default InputContainer;
