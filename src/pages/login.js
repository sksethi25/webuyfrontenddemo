import React from 'react';

import Appbar from '../components/appbar';
import Loader from '../components/backdrop';
import LoginComponent from '../components/login';
import Logout from '../components/logout';
//services
import {loginApi} from '../services/index.js';
import { Redirect } from 'react-router-dom';

const page="Login";
class Login  extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
          loading: false,
          loggedin:props.loggedin,
          helperText:{error:""}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.loggedin!==prevState.loggedin){
            return { loggedin: nextProps.loggedin};
        }
         else return null;
    }


    onLoginSubmit = (username, password)=>{
        let that=this;
        that.setState({loading: true});

        let response =loginApi({"username":username, "password":password});
        let loggedin=false;

        response.then(function(response){
               if(response.status==true){
                loggedin=true;
               }else{
                that.setErrorMessage({error:response.message});
               }
            })
            .catch(function(err){  
               alert(err);
            }).finally(function(){
                setTimeout(function(){
                    that.setState({loading: false, loggedin:loggedin});
                    that.props.logginHandler(loggedin);
                }, 500);
                
            });

    }

    setErrorMessage = (errors) =>{
        this.setState({helperText:errors})
    }
    renderProfileRedirect = (path) => {
            return <Redirect to={path} />
    }
    

    logginHandler =(loggedin) =>{
        this.props.logginHandler(loggedin);
    }

    render(){
        const { loggedin } = this.state;
        return (
            <div>
            <Loader state={this.state.loading} message={"Logging in"} />
            <Appbar page={page} loggedin={this.state.loggedin} logginHandler={this.logginHandler}  />
            {!loggedin && (
                <LoginComponent submitHandler={this.onLoginSubmit} helperText={this.state.helperText}/>)}
            
            {loggedin && (this.renderProfileRedirect("/home"))}

            </div>
        )
    }
}

export default Login;