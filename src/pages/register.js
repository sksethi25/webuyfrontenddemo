import React from 'react';

import Appbar from '../components/appbar';
import Loader from '../components/backdrop';
import RegisterComponent from '../components/register';
import { Redirect } from 'react-router-dom';

import {signupApi} from '../services/index.js';


const page="Register";
class Register  extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          loggedin:this.props.loggedin,
          signedup: false,
          message: "Signing Up",
          helperText:{error:"", email:"", password:"", username:"", contact:""}
          }
    }

    renderRedirect = (path) => {
            return <Redirect to={path}    />
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

    submitHandler = (email, password, username, contact) =>{
        let that=this;
        that.setState({loading: true});
        let response = signupApi({email:email, password:password, username:username, contact:contact});

        let signedup=false;
        response.then(function(response){
               if(response.status==true){
                signedup=true;
                alert("Signuped Successfully, Please Login Now");
               }else{
                var ee = that.state.helperText;
                    ee['error']=response.message;
                    for(const e in response.error.errors){
                        ee[e] =response.error.errors[e].toString();
                    }
                    that.setErrorMessage(ee);
               }
            })
            .catch(function(err){  
               alert(err);
            }).finally(function(){
                setTimeout(function(){
                    that.setState({loading: false, signedup:signedup});
                }, 500);
                
            });

    }

    setErrorMessage = (errors) =>{
        this.setState({helperText:errors})
    }

    render(){
        const {loggedin, signedup,message} = this.state;
        return (
            <div>
                <Loader state={this.state.loading} message={message} />
                <Appbar page={page} loggedin={this.state.loggedin} logginHandler={this.logginHandler}  />
                {!loggedin && (<RegisterComponent submitHandler={this.submitHandler} helperText={this.state.helperText}/>)}
                {loggedin && (this.renderRedirect("/home"))}
                {signedup && (this.renderRedirect("/login"))}
            </div>
        )
    }
}

export default Register;