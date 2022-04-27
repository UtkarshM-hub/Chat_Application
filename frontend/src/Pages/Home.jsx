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
import Sidebar from "../Components/Layout/SideBar/JS/Sidebar";
import BackgroundBlur from "../Components/UI/BackgroundBlur/JS/BackgroundBlur";
import { ForwardMessage } from "../Components/UI/ForwardMessage/JS/ForwardMessage";

let refresh = true;

const Home = () => {
  const history = useHistory();
  const state = useSelector((state) => state.Friends);
  const UserType = localStorage.getItem("Type");
  const { Friends } = useSelector((state) => state);
  const dispatch = useDispatch();
  // const IsNewBie = localStorage.getItem("newBie");
  const userId = localStorage.getItem("userId");
  const [Contacts, setContacts] = useState([]);
  const [ActiveContactState, setActiveContactState] = useState({
    id: undefined,
    socketId: undefined,
    friendId: undefined,
    IsOnline: false,
  });
  const [ShowForwardContainer, setShowForwardContainer] = useState(false);
  const [ForwardMessageString, setForwardMessageString] = useState("");

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
      console.log(data.id, ActiveContactState.friendId);
      if (
        ActiveContactState.friendId !== undefined &&
        data.id === ActiveContactState.friendId
      ) {
        setActiveContact({
          id: ActiveContactState.id,
          socketId: data.socketId,
          friendId: ActiveContactState.id,
          IsOnline: true,
        });
        console.log("working", data.socketId);
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
    });
  };
  console.log(ForwardMessage);
  const newSocket = getSocket();
  // useEffect(() => {
  //   setActiveContact((prev) => prev);
  // }, [ActiveContactState]);

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
    console.log(data);
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
      const newSocketId = await state.filter(
        (item) => item.conversationId === ActiveContactState.id
      );
      await newSocket.emit("sendMsg", {
        data: {
          id: ActiveContactState.id,
          userId: userId,
          friendId: ActiveContactState.friendId,
          message: data,
        },
        socketId: newSocketId[0].friend.id.socketId,
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

  const showForwardHandler = (data) => {
    console.log(data);
    setShowForwardContainer(true);
  };

  // const ForwardMessageHandler = async (Selected) => {
  //   if (Selected[0] !== undefined) {
  //     const data = {
  //       userId: userId,
  //       data: Selected,
  //       message: ForwardMessageString,
  //     };
  //     await axios
  //       .post(
  //         "http://localhost/Connection/ForwardMessage",
  //         JSON.stringify(data),
  //         {
  //           headers: { "Content-Type": "application/json" },
  //         }
  //       )
  //       .then((res) => console.log(res));
  //     for (let i = 0; i <= Selected.length(); i++) {
  //       dispatch(
  //         ChatActions.AddMessage({
  //           id: Selected[i].conversationId,
  //           friendId: ,
  //           userId: userId,
  //           message: ForwardMessageString,
  //         })
  //       );
  //     }
  //     setShowForwardContainer((prev) => !prev);
  //   }
  // };

  return (
    <MessageLayout>
      {/* {UserType === "Business" && <Sidebar />} */}
      {ShowForwardContainer && (
        <BackgroundBlur onClick={setShowForwardContainer}>
          <ForwardMessage
            CloseHandler={setShowForwardContainer}
            message={ForwardMessageString}
          />
        </BackgroundBlur>
      )}
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
          <ChatContainer
            showForward={showForwardHandler}
            CurrentConversatsionId={ActiveContactState.id}
            setForwardMessage={setForwardMessageString}
          />
          <InputContainer getMsg={sendMessageHandler} />
        </Chat>
      )}
    </MessageLayout>
  );
};

export default Home;
