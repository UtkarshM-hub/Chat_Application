import React, { useEffect } from "react";
import MessageLayout from "../Components/MessageLayout/Layout/JS/MessageLayout";
import ContactsContainer from "../Components/MessageLayout/Contacts/JS/ContactsContainer";
import ContactItem from "../Components/MessageLayout/ContactItem/JS/ContactItem";
import { getSocket, init } from "../socket";
import { ChatActions } from "../Store/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Home = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const IsNewBie = localStorage.getItem("newBie");
  const userId = localStorage.getItem("userId");
  let socket;
  const initialize = async () => {
    socket = init("http://localhost");
    socket.emit("saveConnect", { userId: userId });
  };

  console.log(state);
  useEffect(() => {
    initialize();
    if (socket !== undefined) {
      socket.on("disconnect", () => {
        socket.emit("deleteStatus", { userId: userId });
      });
      socket.on("notification", (message) => {
        if (message.type === "Add") {
          dispatch(ChatActions.AddRequest({ Request: { from: message } }));
        }
        if (message.type === "Remove") {
          console.log("Removing");
          dispatch(ChatActions.RemoveRequest({ id: message._id }));
        }
      });

      socket.on("DenyRequested", (message) => {
        return dispatch(ChatActions.DenyRequested(message));
      });
      socket.on("AddFriend", (data) => {
        dispatch(ChatActions.AddFriend(data));
      });
    }
  });

  // Handlers

  useEffect(() => {
    const getContactsHandler = async () => {
      await axios
        .post(
          "http://localhost/Connection/getContacts",
          { userId: userId },
          {
            Headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => dispatch(ChatActions.setFriend(res.data)))
        .catch((err) => console.log(err));
    };
    getContactsHandler();
  }, []);
  console.log(state.Friends);
  return (
    <MessageLayout>
      <ContactsContainer>
        {state.Friends[0] !== undefined &&
          state.Friends[0].friend.Name !== undefined &&
          state.Friends.map((item) => (
            <ContactItem
              name={item.friend.Name}
              image={item.friend.ProfilePic}
              id={item.conversationId}
              key={item.conversationId}
            />
          ))}
      </ContactsContainer>
    </MessageLayout>
  );
};

export default Home;
