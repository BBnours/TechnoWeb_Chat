const {getLogin} = require('../models/login_model');

exports.login = async (req, res) => {
    const body = req.body;
    if(!body.email || !body.password) {
        return res.status(400).json({message: 'Email et password sont obligatoires.'});
    }
    else {
        try{
            const token = await getLogin(body);
            res.status(201).json({access_token : token});

    } catch(err) {

        return res.status(500).json({message: err});
    }
    
    }
};

