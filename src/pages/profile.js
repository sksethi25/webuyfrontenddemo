import React from 'react';

import Appbar from '../components/appbar';
import Loader from '../components/backdrop';
import ProfileComponent from '../components/profile';
import LoginComponent from '../components/login';
import { Redirect } from 'react-router-dom';
import {profileApi} from '../services/index.js';


const page="Profile";
class Profile  extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          loading: false,
           loggedin:this.props.loggedin,
           user:{"email":"", "contact":"", username:""},
           id:props.id,
           helperText:{error:""},
           dataLoaded:false
        }
        this.fetchProfile=this.fetchProfile.bind(this);
    }
     renderProfileRedirect = (path) => {
            return <Redirect to={path} />
    }

    static getDerivedStateFromProps(nextProps, prevState){
        let state={};
        if(nextProps.loggedin!==prevState.loggedin){
        state['loggedin']=nextProps.loggedin;
        state['id']="";
        }
        if(nextProps.id!==prevState.id){
          state['id']= nextProps.id ==undefined ? "" : nextProps.id ;
        }
        return Object.keys(state).length === 0 ? null : state;
    }
    componentDidUpdate(prevProps){
      if(this.props.id!==prevProps.id){
        this.fetchProfile();
      }
    }
    logginHandler =(loggedin) =>{
        this.props.logginHandler(loggedin);
    }
    componentDidMount(){
        this.fetchProfile();
    }
    
     fetchProfile = (e)=>{
        let that=this;
        that.setState({loading: true, dataLoaded:false});

        let responseapi =profileApi(this.state.id);
        let user=this.state.user;
        let loggedin=this.state.loggedin;
        let helperTextmsg=this.state.helperText;

        responseapi.then(function(response){
               if(response.status==true){
                user=response.data.user;
                loggedin=true;
                helperTextmsg['error']="";
               }else{
                if(response.error.code=="logged_out"){
                    loggedin=false;
                    user={"email":"", "contact":"", username:""};
                    helperTextmsg['error']="";
                }else{
                  helperTextmsg['error']=response.message;
                   user={"email":"-", "contact":"-", username:"-"};
                }
               }
            })
            .catch(function(err){  
              helperTextmsg['error']="Some Error Happened, try again later.";
            }).finally(function(){
                setTimeout(function(){
                    that.props.logginHandler(loggedin);
                    that.setState({loading: false, loggedin:loggedin, user:user,helperText:helperTextmsg, dataLoaded:true});

                }, 500);
            });
    }

    render(){
        const {loggedin} =  this.state;
        return (
            <div>
                <Loader state={this.state.loading} message={"Loading Profile"} />
            <Appbar page={page} loggedin={this.state.loggedin} logginHandler={this.logginHandler}   />
                {!loggedin && (
                   this.renderProfileRedirect("/login")
                )}
                {loggedin && (
                   <ProfileComponent user={this.state.user} loggedin={this.state.loggedin} 
                   logginHandler={this.logginHandler} helperText={this.state.helperText} />)
                }
            </div>
        )
    }
}

export default Profile;