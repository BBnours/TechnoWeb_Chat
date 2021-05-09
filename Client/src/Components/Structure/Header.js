import React from "react";
import "../../Style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar,Toolbar,IconButton , Typography} from '@material-ui/core';
import SettingsButton from "../../Settings/SettingsButton";
import AuthService from "../../Services/auth.service";
import Deconnexion from "../Login/Deconnexion";

function Header() {
  return (
    <AppBar position="static">
  <Toolbar>
    <Typography align="'center'" variant='h3' >
      Ece Chat
    </Typography>
    <Deconnexion/>
    <SettingsButton/>
  </Toolbar>
</AppBar>
  );
}

export default Header;
