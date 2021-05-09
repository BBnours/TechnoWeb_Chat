const {listAllUsers} = require('../models/user');
const jwt = require('jsonwebtoken');
const token = 'marionLaBest';

const getLogin = async (body) => {
    const users = await listAllUsers();
    const user = users.find(u => {
        return u.email === body.email && u.password === body.password
    });
    return new Promise((resolve, reject) => {
        if (user) {
            const accessToken = jwt.sign({email: body.email}, token);
            return resolve({user : user , accessToken : accessToken});
        }
        else {
            reject();
        }
    });
};

module.exports = {getLogin};
