const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');

const User = db.User;

exports.signup = async (req, res) => {
    try {
        const { fullname, email, password, role } = req.body;
        const user = await User.create({ fullname, email, password, role });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params.id;
        await User.destroy({ where: { id: userId } });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserbyId = async (req,res) =>{
    try {
        const {id} = req.params;
        const user = await User.findOne({where:{id}});
        res.json({user})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.params.id; // Get user ID from the URL params
        const { fullname, email, role } = req.body; // Destructure the fields from the request body

        // Find the user by ID
        const user = await User.findByPk(userId);

        // If the user is not found, return a 404 error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's profile information
        user.fullname = fullname;
        user.email = email;
        user.role = role;

        // Save the updated user back to the database
        await user.save();

        // Return the updated user information
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        // If there's an error, return a 500 error
        res.status(500).json({ error: error.message });
    }
};
