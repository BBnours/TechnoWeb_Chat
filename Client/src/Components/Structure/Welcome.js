import React from "react";
import {} from 'react';
import "../../Style/App.css";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";

export default () => {
  return (
    <div className="welcome">
      <h2>Bonjour et bienvenue sur ECE chat </h2>
      <p>Cette application te permettra de parler en toute libérté à tes amis sans modération<br/>
      N'hésite pas à faire autant de channels et de discussions que tu veux, tu peux inviter autant de monde que tu le souhaite !!
      </p>
      <div style={{display:"flex", flexDirection:"column"}}>
      <img src="./welcome.gif"/>
      <Button color="primary" variant="contained">
          <Link to={"/app"} style={{ textDecoration: 'none', color:'black' }}>Continuer</Link>
      </Button>
      </div>

      <p><br/>N'hésite pas à partager Ece Chat à tes amis !😁
      </p>
    </div>
  );
}