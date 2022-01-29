import './App.css';
import { init } from './socket';
import { Switch,Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Login from './Pages/Login';
import Chat from './Pages/Chat';

function App() {
  const history=useHistory();
  const socket=init("http://localhost");
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/login"/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/chatbox">
        <Chat/>
      </Route>
    </Switch>
  );
}

export default App;
