const bcrypt = require('bcrypt');
const { createToken } = require('../controller/jwtController');
const User = require('../models/User');
const { checkExistingEmail } = require('../middleware/emailDuplikate');
require('dotenv').config();
const secretKey = process.env.SECRET; 

exports.createLink = async (req, res) => 
{
    
};
