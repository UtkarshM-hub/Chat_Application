import './App.css';
import { init } from './socket';
import { Switch,Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function App() {
  const history=useHistory();
  const socket=init("http://localhost");
  useEffect(()=>{
    history.push("/chatbox")
  },[]);
  return (
    <Switch>
      <Route path="/" exact>
      <h1>home</h1>
      </Route>
    </Switch>
  );
}

export default App;
