import React from "react";
import "../../Style/App.css";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";
import AuthService from "../../Services/auth.service";
import {MdExitToApp} from "react-icons/all";

function Deconnexion() {

  const history = useHistory();

  const routeChange = () =>{
    AuthService.logout();
    history.push('/');
  }


  return (
    <div className="DecoDiv">
      <Button
        variant="contained"
        color="secondary"
        onClick= {routeChange}>
        <MdExitToApp id="DecoIcon" >
        </MdExitToApp>
      </Button>
    </div>
  );
}

export default Deconnexion;
