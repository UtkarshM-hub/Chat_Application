import './App.css';
import { Route, Switch } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Alert from './Components/UI/Alert/JS/Alert';
import { useState } from 'react';
import Login from './Pages/Login';
import Layout from './Components/Layout/Layout/JS/Layout';
import Home from './Pages/Home';
import Inventory from './Pages/Inventory';
import Section from './Pages/Section';
import Store from './Pages/Store';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import Settings from './Pages/Settings';
import SettingsContainer from './Components/Settings/SettingsContainer/JS/SettingsContainer';
import Address from './Pages/Address';
import MyOrders from './Pages/MyOrders';
import Sales from './Pages/Sales';
import UpdateProfile from './Pages/UpdateProfile';
import Analytics from './Pages/Analytics';

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
        <Route path="/inventory" exact>
          <Inventory/>
        </Route>
        <Route path="/inventory/:sectionId" exact>
          <Section/>
        </Route>
        <Route path="/Shop" exact>
          <Store/>
        </Route>
        <Route path="/ProductDetails/:ProductId" exact>
          <ProductDetails/>
        </Route>
        <Route path="/Cart" exact>
          <Cart show={setShow} data={setMessageData}/>
        </Route>
        <Route path="/Cart/:BuyNow" exact>
          <Cart show={setShow} data={setMessageData}/>
        </Route>
        <Route path="/Settings">
          <SettingsContainer>
            <Route path="/Settings/Profile" exact>
              <UpdateProfile/>
            </Route>
            <Route path="/Settings/General" exact>
              <Address/>
            </Route>
            <Route path="/Settings/Payments" exact>
              <Settings/>
            </Route>
          </SettingsContainer>
        </Route>
        <Route path="/MyOrders">
          <MyOrders/>
        </Route>
        <Route path="/Sales">
          <Sales/>
        </Route>
        <Route path="/Analytics">
          <Analytics/>
        </Route>
      </Layout>
    </Switch>
    </>
  );
}

export default App;
