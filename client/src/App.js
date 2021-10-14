import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import AppRoute from './AppRoute';
import { Login } from './pages';


class App extends React.Component{
  
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <AppRoute path="/login" exact component={Login} />
          </Switch>
        </Router>
      </div>
    );
  } 
}

export default App;
