import React from "react";
import {} from 'react';
import "../Style/App.css";
import {Link} from "react-router-dom";

export default () => {
  return (
    <div className="login">
      <h2>Connexion </h2>
        <label className="labelLogin">Nom</label>
        <input type="text" ></input>
        <br></br>
        <label className="labelLogin">Password</label>
        <input  type="password" ></input>
        <Link to="/welcome"><h3 className="button_W">se connecter</h3></Link>
      <Link to="/nv_compte"><h3 className="button_W">créer un compte</h3></Link>
    </div>
  );
}