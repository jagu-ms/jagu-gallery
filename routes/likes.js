const express = require('express');

const router = express.Router();

const controller = require('../controllers/likeController');

const authMiddleware = require('../middlewares/authMiddleware');

router.post('/:postId', authMiddleware.authenticated, controller.handler);

module.exports = router;