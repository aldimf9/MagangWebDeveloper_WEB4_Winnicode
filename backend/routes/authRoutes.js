const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.delete('/delete/:id', authController.deleteUser);
router.get(`/profile/:id`,authController.getUserbyId);
router.put(`/edit/:id`,authController.updateProfile);
module.exports = router;
