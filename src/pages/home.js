import React from 'react';

import Appbar from '../components/appbar';
import Loader from '../components/backdrop';
import Login from '../components/login';
import Logout from '../components/logout';
import {loginApi} from '../services/index.js';
import { Redirect } from 'react-router-dom';

const page="Home";
class Home  extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
          loading: false,
          loggedin:this.props.loggedin
          }
    }

   static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.loggedin!==prevState.loggedin){
        return { loggedin: nextProps.loggedin};
        }
         else return null;
    }

    logginHandler =(loggedin) =>{
        this.props.logginHandler(loggedin);
    }

    renderProfileRedirect = (path) => {
            return <Redirect to={path}    />
    }
    render(){
        const { loggedin } = this.state;
        return (
            <div>
            <Loader state={this.state.loading} />
            <Appbar page={page} loggedin={this.state.loggedin} logginHandler={this.logginHandler}  />
            {!loggedin && (
                   this.renderProfileRedirect("/login")
            )}
            {loggedin &&  <Logout loggedin={this.state.loggedin} logginHandler={this.logginHandler} /> }

            </div>
        )
    }
}

export default Home;