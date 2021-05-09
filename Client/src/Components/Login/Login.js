import React, {useState} from "react";
import {} from 'react';
import "../../Style/App.css";
import {Link} from "react-router-dom";
import AuthService from "../../Services/auth.service";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
} from "@material-ui/core";

export default () => {

  const history = useHistory();

  const [allValues, setAllValues] = useState({
    email: '',
    password: ''
  });

  const changeHandler = e => {
    setAllValues({...allValues, [e.target.name]: e.target.value})
  };

  const onSubmit = async () => {
    const check =await AuthService.login(allValues.email, allValues.password);
    if (check === false){
      history.push("/");
    }
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
            <Link to="/welcome">Se Connecter</Link>
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