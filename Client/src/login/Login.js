import React, {useState} from "react";
import {} from 'react';
import "../Style/App.css";
import {Link} from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default () => {
  let check;
  const history = useHistory();
  const [allValues, setAllValues] = useState({
    nom: '',
    password: ''
  });

  const changeHandler = e => {
    setAllValues({...allValues, [e.target.name]: e.target.value})
  };

  const onSubmit = async () => {
    const {data: users} = await axios.get(
        `http://localhost:8000/api/v1/users/`
    )
    console.log(users)
    for (let i = 0; i < users.length; i++) {
      if (allValues.nom == users[i].name && allValues.password == users[i].password) {
        check = true;
      }
    }
    if (check != true){
      history.push("/");
    }
  }

    return (
    <div className="login">
      <h2>Connexion </h2>
      <form>
        <div className="form-group">
          <input
              placeholder="Nom"
              name="nom"
              id="nom"
              type="text"
              onChange={changeHandler}>
          </input>
        </div>
        <div className="form-group">
          <input
              placeholder="Password"
              name="password"
              id="password"
              type="password"
              onChange={changeHandler}>
          </input>
        </div>
      </form>
      <button onClick={onSubmit}>
          <Link to="/welcome">se connecter</Link>
      </button>
      <button>
        <Link to="/nv_compte">créer un compte</Link>
      </button>
    </div>
  );
}