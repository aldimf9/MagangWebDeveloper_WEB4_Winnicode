const db = require('../models');
const multer = require('multer');
const path = require('path');

const Test = db.Test;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

exports.upload = multer({ storage }).single('payment_proof');

exports.registerTest = async (req, res) => {
    try {
        const { test_date } = req.body;
        const userId = req.params.id;
        const test = await Test.create({ test_date, userId });
        res.status(201).json({ message: 'Test registered successfully', test });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.uploadPaymentProof = async (req, res) => {
    try {
        const { id,pay } = req.params;
        const payment_proof = req.file.path;
        const test = await Test.findByPk(pay);
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }
        test.payment_proof = payment_proof;
        await test.save();
        res.json({ message: 'Payment proof uploaded successfully', test });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getScores = async (req, res) => {
    try {
        const userId = req.params.id;
        const test = await Test.findAll({ where: {userId}});
        res.json({test});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
