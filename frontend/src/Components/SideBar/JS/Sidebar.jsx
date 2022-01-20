import React, { useEffect, useState } from "react";
import classes from "../CSS/Sidebar.module.css";
import socket, { getSocket } from "../../../socket";
import Conversation from "../../Conversation/JS/Conversation";
import ConvModal from "../../ConvoModal/JS/ConvModal";

const Sidebar = () => {
  const Socket = getSocket();
  const [conversations, setConversations] = useState({});
  const [sectionOpen, setSectionOpen] = useState("Conversations");
  const [ContactModal, setContactModal] = useState(false);
  const [ActiveGroup, setActiveGroup] = useState({});

  useEffect(() => {
    Socket.emit("getRoomData");
    Socket.on("RoomData", (message) => {
      let conv = message.data.rooms.split(" ");
      setConversations({ id: message.data.id, rooms: conv });
    });
  }, [ContactModal]);

  const AddHandler = () => {
    if (sectionOpen === "Contact") {
      setContactModal(true);
    }
  };

  return (
    <>
      {ContactModal && <ConvModal show={setContactModal} />}
      <div className={classes.Sidebar}>
        <div className={classes.Sidebar_Sections}>
          <p
            onClick={(e) => {
              setSectionOpen("Conversations");
            }}
            className={sectionOpen === "Conversations" ? classes.active : ""}
          >
            Conversations
          </p>
          <p
            onClick={(e) => {
              setSectionOpen("Contact");
            }}
            className={sectionOpen === "Contact" ? classes.active : ""}
          >
            Contact
          </p>
        </div>
        <div className={classes.Sidebar_Content}>
          {sectionOpen === "Conversations" &&
            conversations.id !== undefined &&
            conversations.rooms.map((item, index) => {
              return (
                <Conversation
                  onClick={() => setActiveGroup({ name: item })}
                  key={index}
                  name={item}
                  isActive={ActiveGroup.name === item}
                />
              );
            })}
          {sectionOpen !== "Conversations" && <h2>Contacts</h2>}
        </div>
        <div className={classes.Sidebar_AddNew}>
          <button onClick={AddHandler} className={classes.Sidebar_addBtn}>
            {sectionOpen === "Conversations"
              ? "Add Conversation"
              : "Add Contact"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
