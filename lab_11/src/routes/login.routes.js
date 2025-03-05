const express = require('express');
const logInController = require('../controllers/logInController');
const router = express.Router();

router.get('/', logInController.action);
router.post('/', logInController.login);
router.get('/logout', logInController.logOut);

module.exports = router;