const User = require('../models/user');

exports.createUser = async (req, res) => {
    try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
   };

// This controller exports a single function, createUser, which creates a new user using the
// request's body and saves it to the database. 