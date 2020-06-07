import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Menu, MenuItem, Link} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory,Redirect } from 'react-router-dom';


class TopAppBar extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      anchorEl:null,
      open: false,
      loggedin: props.loggedin,
      redirectToProfile:false
    }
  }

  setAnchorEl(value){
    this.setState({anchorEl:value, open: value== null ? false : true});
  }

  toggleDrawer(){
    this.setState({

    })
  }

  handleMenu = (event) => {
    this.setAnchorEl(event.currentTarget);
  };

  handleClose =  () => {
    this.setAnchorEl(null);
  };

  viewProfile = () => {
    this.handleClose();
    this.setState({'redirectToProfile':true});
  }

  renderProfileRedirect = () => {
    if (this.state.redirectToProfile) {
      return <Redirect to='/profile' />
    }
  }

  logoutUser= () => {
    this.handleClose();
    this.props.logginHandler(false);
  }
 
  render(){
    return (
      <div className="appbar-root">
        <AppBar position="static" className="primary-bg" >
          <Toolbar>
            <Typography variant="h6" className="appbar-root">
              {this.props.page}
            </Typography>
          {this.props.loggedin && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle fontSize="large" />
              </IconButton>
              <Menu
                id="menu-appbar"
                elevation={0}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'center',
                  horizontal: 'left',
                }}
                open={this.state.open}
                onClose={this.handleClose}
              >
              <MenuItem onClick={this.viewProfile}>Profile</MenuItem>
                <MenuItem onClick={this.logoutUser}>Logout</MenuItem>
              </Menu>
            </div>
          )}
             </Toolbar>
        </AppBar>
        {this.renderProfileRedirect()}
      </div>

    );
  }

}

export default TopAppBar;


