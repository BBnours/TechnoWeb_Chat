import React from "react";
import "../../Style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar,Toolbar,Typography} from '@material-ui/core';
import SettingsButton from "../../Settings/SettingsButton";
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
