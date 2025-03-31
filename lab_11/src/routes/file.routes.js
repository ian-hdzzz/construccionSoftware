const express = require('express');
const router = express.Router();
const FileController = require('../controllers/fileController');

router.get('/', FileController.get_File); 
    
module.exports = router;