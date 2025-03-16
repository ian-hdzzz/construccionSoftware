const express = require('express');
const signupController = require('../controllers/authController');
const router = express.Router();

router.get('/signup', signupController.get_signup);
router.post('/signup', signupController.post_signup);
router.get('/login', signupController.get_login);
router.post('/login', signupController.post_login);
router.get('/logout', signupController.logOut);

module.exports = router;                                                                