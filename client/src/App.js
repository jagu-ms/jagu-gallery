import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import AppRoute from './AppRoute';
import Auth from "./Auth";
import { Login, Home, Signup} from './pages';


class App extends React.Component{
  
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <AppRoute path="/login" exact component={Login} can={Auth.guest} redirect="/" />
            <AppRoute path="/signup" exact component={Signup} can={Auth.guest} redirect="/" />
            <AppRoute path="/" exact component={Home}  />
          </Switch>
        </Router>
      </div>
    );
  } 
}

export default App;
