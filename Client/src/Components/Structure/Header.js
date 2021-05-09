import React from "react";
import "../../Style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar,Toolbar,IconButton , Typography} from '@material-ui/core';
import {Link} from "react-router-dom";
import SettingsButton from "../../Settings/SettingsButton";
import AuthService from "../../Services/auth.service";

function Header() {
  return (
    <AppBar position="static">
  <Toolbar>
    <Typography variant='h3' >
      Ece Chat
    </Typography>
    <Link onClick={deconnexion} className="button" to="/">Log Out</Link>
    <SettingsButton/>
  </Toolbar>
</AppBar>
  );
}

function deconnexion() {
  AuthService.logout();
}

export default Header;
