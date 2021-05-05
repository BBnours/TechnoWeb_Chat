import React from "react";
import "../Style/App.css";
import { Typography, AppBar, Toolbar} from '@material-ui/core';

function Footer() {
  return (
    <AppBar position="static" color="primary">
              <Typography>
              © 2021 ECE ハク
              </Typography>
        </AppBar>
  );
}

export default Footer;
