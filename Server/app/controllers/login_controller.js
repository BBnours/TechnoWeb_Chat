const {getLogin} = require('../models/login_model');

exports.login = async (req, res) => {
    const body = req.body;
    const token = await getLogin(body)
    if(!body.email || !body.password) {
        return res.status(400).json({message: 'Email et password sont obligatoires.'});
    }
    else {
        return res.status(400).json({access_token: token});
    }
};

