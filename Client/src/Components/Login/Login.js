import React, {useState} from "react";
import {} from 'react';
import "../../Style/App.css";
import {Link} from "react-router-dom";
import AuthService from "../../Services/auth.service";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
} from "@material-ui/core";

export default () => {

  let check;
  const history = useHistory();

  const [allValues, setAllValues] = useState({
    email: '',
    password: ''
  });

  const changeHandler = e => {
    setAllValues({...allValues, [e.target.name]: e.target.value})
  };

  const onSubmit = async () => {
    const {data: users} = await axios.get(
        `http://localhost:8000/api/v1/users/`
    )
    for (let i = 0; i < users.length; i++) {
      if (allValues.email == users[i].email && allValues.password == users[i].password) {
        check = true;
      }
    }
    if (check != true){
      history.push("/");
    }
    else
      await AuthService.login(allValues.email, allValues.password);
  }

    return (
      <form className="login">
        <Grid container spacing={3}>
          <h2 className="login">Connection</h2>
          <br></br>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                    placeholder="Email"
                    name="email"
                    id="email"
                    type="text"
                    onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    placeholder="Password"
                    name="password"
                    id="password"
                    type="password"
                    onChange={changeHandler}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" onClick={onSubmit} type="submit" variant="contained">
              <Link to="/welcome">se connecter</Link>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" type="submit" variant="contained">
              <Link to="/nv_compte">créer un compte</Link>
            </Button>
          </Grid>
        </Grid>
      </form>
  );
}