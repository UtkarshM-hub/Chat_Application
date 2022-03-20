import React, { useEffect, useState } from "react";
import MessageLayout from "../Components/MessageLayout/Layout/JS/MessageLayout";
import ContactsContainer from "../Components/MessageLayout/Contacts/JS/ContactsContainer";
import ContactItem from "../Components/MessageLayout/ContactItem/JS/ContactItem";
import { getSocket, init } from "../socket";
import { ChatActions } from "../Store/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Chat from "../Components/MessageLayout/Chat/Chat/JS/Chat";
import InputContainer from "../Components/MessageLayout/Chat/InputContainer/JS/InputContainer";
import ChatContainer from "../Components/MessageLayout/Chat/ChatContainer/JS/ChatContainer";
import { useHistory } from "react-router-dom";
import { config } from "@fortawesome/fontawesome-svg-core";

let refresh = true;

const Home = () => {
  const history = useHistory();
  const { Friends } = useSelector((state) => state);
  const dispatch = useDispatch();
  const IsNewBie = localStorage.getItem("newBie");
  const userId = localStorage.getItem("userId");
  const [Contacts, setContacts] = useState([]);
  const [ActiveContactState, setActiveContactState] = useState({
    id: undefined,
    socketId: undefined,
    friendId: undefined,
    IsOnline: false,
  });

  let socket;
  const initialize = async () => {
    if (refresh) {
      socket = init("http://localhost");
      refresh = false;
    }
    socket.emit("saveConnect", { userId: userId });

    socket.on("getMsg", (message) => {
      console.log(message);
      dispatch(ChatActions.AddMessage(message.data));
    });
    socket.on("IsMyFriendOffline", (data) => {
      dispatch(ChatActions.IsMyFriendOffline(data));
    });
    socket.on("IsMyFriendOnline", (data) => {
      console.log(
        data.id === ActiveContactState.friendId &&
          ActiveContactState.friendId !== undefined
      );
      if (
        data.id === ActiveContactState.friendId &&
        ActiveContactState.friendId !== undefined
      ) {
        console.log("working", data.socketId);
        setActiveContactState({
          id: ActiveContactState.id,
          socketId: data.socketId,
          friendId: ActiveContactState.friendId,
          IsOnline: true,
        });
      }
      dispatch(ChatActions.IsMyFriendOnline(data));
    });
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
      console.log(data);
      dispatch(ChatActions.AddFriend(data));
      // setContacts((prev) => {
      //   let updated = [...prev, data];
      //   return updated;
      // });
    });
  };

  const newSocket = getSocket();

  const getMessages = async () => {
    await axios
      .post(
        "http://localhost/Connection/GetMsg",
        JSON.stringify({ userId: userId }),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        dispatch(ChatActions.SetMessages({ messages: res.data }));
      })
      .catch((err) => console.log(err));
  };

  const getContactsHandler = async () => {
    await axios
      .post(
        "http://localhost/Connection/getContacts",
        { userId: userId },
        {
          Headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        dispatch(ChatActions.setFriend(res.data));
        return setContacts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const setContactsHandler = () => {
      setContacts(Friends);
    };
    setContactsHandler();
  }, [Friends]);
  useEffect(() => {
    console.log(userId);
    if (userId === undefined || userId === null) {
      history.push("/signup");
    }
    initialize();
    getContactsHandler();

    getMessages();
  }, []);

  const setActiveContact = async (data) => {
    const object = await Contacts.find(
      (item) => item.conversationId === data.id
    );
    console.log({
      id: data.id,
      socketId: object.friend.id.socketId,
      IsOnline: data.IsOnline,
      friendId: data.friendId,
    });
    setActiveContactState({
      id: data.id,
      socketId: object.friend.id.socketId,
      IsOnline: data.IsOnline,
      friendId: data.friendId,
    });
  };

  const sendMessageHandler = async (data) => {
    dispatch(
      ChatActions.AddMessage({
        id: ActiveContactState.id,
        userId: userId,
        friendId: ActiveContactState.friendId,
        message: data,
      })
    );
    console.log(
      newSocket.connected === true,
      ActiveContactState.IsOnline === true
    );
    if (newSocket.connected === true && ActiveContactState.IsOnline === true) {
      console.log("sending");
      newSocket.emit("sendMsg", {
        data: {
          id: ActiveContactState.id,
          userId: userId,
          friendId: ActiveContactState.friendId,
          message: data,
        },
        socketId: ActiveContactState.socketId,
      });
    }
    await axios
      .post(
        "http://localhost/Connection/SaveMessage",
        JSON.stringify({
          id: ActiveContactState.id,
          from: userId,
          to: ActiveContactState.friendId,
          message: data,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  console.log(Contacts);
  return (
    <MessageLayout>
      <ContactsContainer>
        {Contacts[0] !== undefined &&
          Contacts[0].friend.id.Name !== undefined &&
          Contacts.map((item) => (
            <ContactItem
              Active={
                ActiveContactState.id === item.conversationId ? true : false
              }
              name={item.friend.id.Name}
              image={item.friend.id.ProfilePic}
              id={item.conversationId}
              key={item.conversationId}
              socketId={item.friend.id.socketId}
              IsOnline={item.friend.id.IsOnline}
              onClick={setActiveContact}
              friendId={item.friend.id._id}
            />
          ))}
      </ContactsContainer>
      {ActiveContactState.id !== undefined && (
        <Chat>
          <ChatContainer CurrentConversatsionId={ActiveContactState.id} />
          <InputContainer getMsg={sendMessageHandler} />
        </Chat>
      )}
    </MessageLayout>
  );
};

export default Home;
