import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import AppRoute from './AppRoute';
import Auth from "./Auth";
import { Login, Home, Signup, CreatePost, ViewPost, EditePost} from './pages';


class App extends React.Component{
  
  render() {
    return (
      <div> 
        <Router>
          <Switch>
            <AppRoute path="/login" exact component={Login} can={Auth.guest} redirect="/" />
            <AppRoute path="/signup" exact component={Signup} can={Auth.guest} redirect="/" />
            <AppRoute path="/" exact component={Home}  />
            <AppRoute path="/viewpost" exact component={ViewPost}/>
            <AppRoute path="/editepost" exact component={EditePost}/>
            <AppRoute path="/createpost" exact component={CreatePost}/>
          </Switch>
        </Router>
      </div>
    );
  } 
}

export default App;
