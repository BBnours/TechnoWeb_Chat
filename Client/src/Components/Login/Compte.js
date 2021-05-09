import React, {Component, useCallback, useState} from "react";
import {} from 'react';
import "../../Style/App.css";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import authHeader from "../../Services/auth-header";
import AuthService from "../../Services/auth.service";
import {Button, FormControl, FormHelperText, Grid, InputLabel, NativeSelect, TextField} from "@material-ui/core";

export default () => {

    const history = useHistory();
    let check;
    const [all_users, setUsers] = useState([]);
    const [allValues, setAllValues] = useState({
        nom: '',
        email: '',
        password: '',
        src:''
    });
    const changeHandler = e => {
        setAllValues({...allValues, [e.target.name]: e.target.value})
    }

    const fetchUsers = async () => {
        setUsers([])
        const {data: users} = await axios.get(`http://localhost:8000/api/v1/users/`)
        setUsers(users)
    }
    
    const addUser = (newUser) => {
        fetchUsers()
    }

    const emailUse = async ()=>{
        const {data: users} = await axios.get(
            `http://localhost:8000/api/v1/users/`
        )
        for (let i = 0; i < users.length; i++) {
            if (allValues.email == users[i].email ) {
                return check = true;
            }
        }
    }

    const onSubmit = async () => {
        if (allValues.email != '' || allValues.nom != '' || allValues.password != '') {
            await emailUse();
            if(check!=true) {
                const {data: user} = await axios.post(
                    `http://localhost:8000/api/v1/users/`
                    , {
                        name: allValues.nom,
                        email: allValues.email,
                        password: allValues.password,
                        src: allValues.src,
                    })
                fetchUsers()
                addUser(user)
                setAllValues({
                    nom: '',
                    email: '',
                    password: '',
                    src: ''
                })
                await AuthService.login(allValues.email, allValues.password);
            }else {
                history.push("/nv_compte");
            }
        }
        else {
            history.push("/nv_compte");
        }
    }
    const deku = './icon_deku.png';
    const kirua = './icon_kirua.png';
    const fille = './icon_fille.jpg';

  return (
      <form className="login">
          <Grid container spacing={3}>
              <h2 className="login">Création d'un compte</h2>
              <br></br>
              <Grid item xs={12}>
                  <Grid container spacing={2}>
                      <Grid item xs={12}>
                          <TextField
                              placeholder="Nom"
                              name="nom"
                              id="nom"
                              type="text"
                              onChange={changeHandler}
                          />
                      </Grid>
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
                      <Grid item xs={12}>
                          <InputLabel>Choix Image</InputLabel>
                          <NativeSelect
                              name="src"
                              id="src"
                              onChange={changeHandler}>
                              <option
                                      aria-label="None"
                                      value="" />
                              <option
                                      value={deku}
                              >Deku</option>
                              <option
                                      value={kirua}>Kirua
                              </option>
                              <option
                                      value={fille}
                              >Fille</option>
                          </NativeSelect>
                      </Grid>
                  </Grid>
              </Grid>
              <Grid item xs={12}>
                  <Button color="primary" onClick={onSubmit} type="submit" variant="contained">
                      <Link to={"/welcome"}>continuer</Link>
                  </Button>
              </Grid>
              <Grid item xs={12}>
                  <Button color="primary" type="submit" variant="contained">
                      <Link to={"/"}>retour</Link>
                  </Button>
              </Grid>
          </Grid>
      </form>
  );
}