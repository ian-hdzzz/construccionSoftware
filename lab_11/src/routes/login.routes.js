const express = require('express');
const logInController = require('../controllers/logInController');
const router = express.Router();

router.get('/', logInController.login);

module.exports = router;