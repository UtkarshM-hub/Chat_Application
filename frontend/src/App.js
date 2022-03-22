import './App.css';
import { Route, Switch } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Alert from './Components/UI/Alert/JS/Alert';
import { useState } from 'react';
import Login from './Pages/Login';
import Layout from './Components/Layout/Layout/JS/Layout';
import Home from './Pages/Home';

function App() { 
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
          <Home/>
        </Route>
      </Layout>
    </Switch>
    </>
  );
}

export default App;
