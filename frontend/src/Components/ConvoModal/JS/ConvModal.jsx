import React, { useRef } from "react";
import { getSocket } from "../../../socket";
import classes from "../CSS/ConvModal.module.css";
import { useHistory } from "react-router-dom";

const ConvModal = ({ show }) => {
  const Socket = getSocket();
  const history = useHistory();
  const nameRef = useRef();
  const idRef = useRef();

  const addContactHandler = () => {
    const data = {
      name: nameRef.current.value,
      id: idRef.current.value,
    };
    Socket.emit("AddContact", data, (success) => {
      if (success) {
      }
      console.log(success);
    });
    show(false);
  };
  return (
    <div className={classes.ConvModal}>
      <form>
        <h2>Add Contact</h2>
        <input
          ref={nameRef}
          type="text"
          placeholder="Enter name of the contact"
        />
        <input ref={idRef} type="text" placeholder="Enter id of the contact" />
        <button onClick={addContactHandler}>Add Contact</button>
        <button
          onClick={() => {
            show(false);
          }}
          className={classes.ConvModal_CloseBtn}
        >
          Close
        </button>
      </form>
    </div>
  );
};

export default ConvModal;
