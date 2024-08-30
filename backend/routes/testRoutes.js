const express = require('express');
const testController = require('../controllers/testController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register/:id', authMiddleware, testController.registerTest);
router.post(`/payment/:id/:pay`, authMiddleware, testController.upload, testController.uploadPaymentProof);
router.get('/scores/:id', authMiddleware, testController.getScores);

module.exports = router;
