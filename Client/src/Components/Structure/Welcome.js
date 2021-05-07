import React from "react";
import {} from 'react';
import "../../Style/App.css";
import {Link} from "react-router-dom";

export default () => {
  return (
    <div className="welcome">
      <h2>Bonjour et bienvenue sur ECE chat </h2>
        <Link to="/app"><h3 className="button_W">Continuer</h3></Link>
    </div>
  );
}