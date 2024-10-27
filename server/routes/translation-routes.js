const express = require('express');
const { addTranslation, getTranslation } = require('../controllers/traslation-controller');
const { adminAuth } = require('../middlewares/auth');

const router = express.Router();

router.get('/', getTranslation);

router.post('/add', adminAuth, addTranslation);

module.exports = router;