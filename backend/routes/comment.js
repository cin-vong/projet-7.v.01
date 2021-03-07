const express = require('express');
const router = express.Router();      
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.get('/', auth, commentCtrl.getAllComments);
router.post('/comment', auth, multer, commentCtrl.comment);
router.get('/:id', auth, commentCtrl.getOneComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;