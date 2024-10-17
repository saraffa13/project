const express = require('express');
const { addTranslation, getTranslation } = require('../controllers/traslation-controller');

const router = express.Router();

router.post('/add', addTranslation);
router.get('/', getTranslation);

module.exports = router;