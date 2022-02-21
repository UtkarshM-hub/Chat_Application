import './App.css';
import { Route, Switch } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Alert from './Components/UI/Alert/JS/Alert';
import { useState } from 'react';
import Login from './Pages/Login';
import Layout from './Components/Layout/Layout/JS/Layout';
import { init } from './socket';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChatActions } from './Store/store';
import { useDispatch } from 'react-redux'

function App() { 
  const state=useSelector(state=>state);
  const dispatch=useDispatch();
  const IsNewBie=localStorage.getItem("newBie");
  const userId=localStorage.getItem("userId");
  let socket;
  const initialize=async ()=>{
    socket=init("http://localhost");
    socket.emit("saveConnect",{userId:userId});
    socket.on("disconnect",()=>{
      socket.emit("deleteStatus",{userId:userId});
    })
    socket.on("notification",message=>{
      console.log(message)
      dispatch(ChatActions.AddNotification({ Notifications: message }));
    })
  }
  console.log(state)
  useEffect(()=>{
     initialize();
    if(IsNewBie){
      // it will be applied at the end
    }
  },[])
  
  // Declerations
  const [show,setShow] =useState(false);
  const [MessageData,setMessageData] =useState(false);
  // Handlers
  const setShowHandler=(Data)=>{
    setShow(true);
    setMessageData(Data);
    const timer=setTimeout(()=>{
      setShow(false);
      if(Data.type==="Success"&& Data.next==='[object Function]'){
        Data.next(true);
      }
      return clearTimeout(timer);
    },3000)
  }
  return (
    <>
    <Alert type={MessageData.type} message={MessageData.message} show={show}/>
    <Switch>
      <Route path="/signup" exact>
        <SignUp show={setShowHandler}/>
      </Route>
      <Route path="/login" exact>
        <Login show={setShowHandler}/>
      </Route>
      <Layout>
        <Route path="/" exact>
          <h1>Working</h1>
        </Route>
      </Layout>
    </Switch>
    </>
  );
}

export default App;
