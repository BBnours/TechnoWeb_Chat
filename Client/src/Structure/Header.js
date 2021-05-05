import React from "react";
import "../Style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import { AppBar,Toolbar,IconButton , Typography} from '@material-ui/core';

function Header() {
  return (
    <AppBar position="static">
  <Toolbar>
    <Typography variant='h3' >
      Ece Chat
    </Typography>
  </Toolbar>
</AppBar>
  );
}

export default Header;
