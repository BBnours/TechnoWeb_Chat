import React, {Component, useCallback, useState} from "react";
import {} from 'react';
import "../../Style/App.css";
import {Link} from "react-router-dom";
import axios from "axios";
import authHeader from "../../Services/auth-header";

export default class Compte extends Component{

    handleSubmit = e  => {
        e.preventDefault();
        const user = {
            name: this.nom,
            email: this.email,
            password: this.password
        }
        if (this.email != '' || this.nom != '' || this.password != '') {
            axios.post(`http://localhost:8000/api/v1/users/`, user,
                { headers: authHeader() }).then(
                    res => {
                        console.log(res)
                    }
            ).catch(
                err =>
                    console.log(err)
            )
        }
    }

    render() {
        return (
            <div className="login">
                <h2>Création Compte </h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            placeholder="Nom"
                            name="nom"
                            id="nom"
                            type="text"
                            onChange={e=>this.name = e.target.value}
                        >
                        </input>
                    </div>
                    <div className="form-group">
                        <input
                            placeholder="Email"
                            name="email"
                            id="email"
                            type="text"
                            onChange={e=>this.email = e.target.value}
                        >
                        </input>
                    </div>
                    <div className="form-group">
                        <input
                            placeholder="Password"
                            name="password"
                            id="password"
                            type="password"
                            onChange={e=>this.password = e.target.value}
                        >
                        </input>
                    </div>
                    <button>
                        <Link to={"/welcome"}>continuer</Link>
                    </button>
                </form>
            </div>
        )
    }
}

    // const history = useHistory();
    // const [all_users, setUsers] = useState([]);
    // const [allValues, setAllValues] = useState({
    //     nom: '',
    //     email: '',
    //     password: ''
    // });
    // const changeHandler = e => {
    //     setAllValues({...allValues, [e.target.name]: e.target.value})
    // }
    //
    // const fetchUsers = async () => {
    //     setUsers([])
    //     const {data: users} = await axios.get(`http://localhost:8000/api/v1/users/`, { headers: authHeader() })
    //     setUsers(users)
    // }

    // if(all_users == []){
    //     fetchUsers()
    // }
    //
