const express = require('express');

const router = express.Router();

const controller = require('../controllers/likeController');

const authMiddleware = require('../middlewares/authMiddleware');

router.post('/:id', authMiddleware.authenticated, controller.create);

router.post('/delete/:id', authMiddleware.authenticated, controller.delete);

module.exports = router;