import React from "react";
import "../Style/App.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdSettings } from "react-icons/md";
import { AppBar, Toolbar, IconButton, Typography, Link, Button } from "@material-ui/core";

function SettingsButton() {

  const history = useHistory();

  const routeChange = () =>{ 
    let path = `settings`; 
    history.push(path);
  }


  return (
    <div className="SettingsDiv">
      <Button
        variant="contained"
        color="secondary"
        onClick= {routeChange}>
        <MdSettings id="SettingsIcon" >
        </MdSettings>
      </Button>
    </div>
  );
}

export default SettingsButton;
