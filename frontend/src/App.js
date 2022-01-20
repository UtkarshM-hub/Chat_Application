import { useEffect } from 'react';
import './App.css';
import Login from './Pages/Login';
import { init,getSocket } from './socket';
import { Switch,Route } from 'react-router-dom';
import Chat from './Pages/Chat';
import { useHistory } from 'react-router-dom';

function App() {
  const history=useHistory();
  const socket=init("http://localhost");
  useEffect(()=>{
    history.push("/chatbox")
  },[]);
  return (
    <Switch>
      <Route path="/login" exact>
        <Login/>
      </Route>
      <Route path="/chatbox">
        <Chat/>
      </Route>
    </Switch>
  );
}

export default App;
