import axios from "axios";
import {} from 'react';

const login = (email, password) => {
    return axios
        .post('http://localhost:8000/api/v1/login', {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data.message;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

export default {
    login,
    logout,
    getCurrentUser,
};
