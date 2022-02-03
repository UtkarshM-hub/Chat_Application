import './App.css';
import { Route, Switch } from 'react-router-dom';
import SignUp from './Pages/SignUp';

function App() {  
  return (
    <Switch>
      <Route path="/signup">
        <SignUp/>
      </Route>
    </Switch>
  );
}

export default App;
