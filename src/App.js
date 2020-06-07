import React from 'react';
import './static/css/App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import {logoutApi} from './services/index.js';

class App  extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        loggedin:(localStorage.getItem('loggedin') == 'true' ? true : false)
      }
      this.logginHandler= this.logginHandler.bind(this);
    }

    logginHandler(loggedin){
      if(loggedin==false){
        logoutApi();
      }
      localStorage.setItem('loggedin', loggedin);
      this.setState({'loggedin':loggedin});
    }

    render(){
        return (
     <BrowserRouter >
        <Switch>
          <Route exact path="/">
             <Home />
          </Route>
          <Route exact path="/home"  >
             <Home loggedin={this.state.loggedin} logginHandler={this.logginHandler} />
          </Route>
           <Route exact path="/login" >
             <Login loggedin={this.state.loggedin} logginHandler={this.logginHandler} />
          </Route>
          <Route exact path="/register"  >
             <Register loggedin={this.state.loggedin} logginHandler={this.logginHandler} />
          </Route>
           <Route exact  path="/profile/:id?" render={(props)=>{
              return(
               <Profile loggedin={this.state.loggedin}  logginHandler={this.logginHandler}  id={props.match.params.id} />
            )}} />
        </Switch>
    </BrowserRouter>
  );
    }
}

export default App;
