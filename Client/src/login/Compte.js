import React, {useState} from "react";
import {} from 'react';
import "../Style/App.css";
import {Link} from "react-router-dom";
import axios from "axios";

export default () => {

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [password, setPassword] = useState("");

    function activateLasers( ) {
        console.log('toto');
    };

  return (
    <div className="login">
      <h2>Connexion </h2>
        <label className="labelLogin">Nom</label>
        <input type="text" value={nom}></input>
        <br></br>
      <label className="labelLogin">Prenom</label>
      <input type="text" value={prenom}></input>
      <br></br>
        <label className="labelLogin">Password</label>
        <input  type="password" value={password}></input>
        <Link onClick={activateLasers()} to="/welcome"><h3 className="button_W">continuer</h3></Link>
    </div>
  );
}