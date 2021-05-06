import React, {useCallback, useState} from "react";
import {} from 'react';
import "../Style/App.css";
import {Link} from "react-router-dom";
import axios from "axios";

export default () => {
    const [all_users, setUsers] = useState([]);
    const [allValues, setAllValues] = useState({
        nom: '',
        email: '',
        password: ''
    });
    const changeHandler = e => {
        setAllValues({...allValues, [e.target.name]: e.target.value})
    }

    const fetchUsers = async () => {
        setUsers([])
        const {data: users} = await axios.get(`http://localhost:8000/api/v1/users/`)
        setUsers(users)
    }

    // if(all_users == []){
    //     fetchUsers()
    // }
    //
    const addUser = (newUser) => {
        fetchUsers()
    }

    const onSubmit = async () => {
        const {data: user} = await axios.post(
            `http://localhost:8000/api/v1/users/`
            , {
                name: allValues.nom,
                email: allValues.email,
                password: allValues.password,
            })

        addUser(user)
        setAllValues({
            nom: '',
            email: '',
            password: ''
        })
    }

  return (
    <div className="login">
      <h2>Création Compte </h2>
        <form>
            <div className="form-group">
                <input
                    placeholder="Nom"
                    name="nom"
                    id="nom"
                    type="text"
                    onChange={changeHandler}
                >
                </input>
            </div>
            <div className="form-group">
                <input
                    placeholder="Email"
                    name="email"
                    id="email"
                    type="text"
                    onChange={changeHandler}
                >
                </input>
            </div>
            <div className="form-group">
                <input
                    placeholder="Password"
                    name="password"
                    id="password"
                    type="password"
                    onChange={changeHandler}
                >
                </input>
            </div>
            <button onClick={onSubmit}>
                <Link to={"/welcome"}>continuer</Link>
            </button>
        </form>
    </div>
  );
}