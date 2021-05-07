const {listAllUsers} = require('../models/user');
const jwt = require('jsonwebtoken');
const token = 'marionLaBest';

const getLogin = async body => {
    const users = await listAllUsers();
    const user = users.find(u => {
        return u.email === body.email && u.password === body.password
    });
    return new Promise((resolve, reject) => {
        if (user) {
            const access_token = jwt.sign({email: body.email, password: body.password}, token);
            return resolve(access_token);
        }
        else {
            reject();
        }
    });
};

module.exports = {getLogin};
