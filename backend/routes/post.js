const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const postCtrl = require('../controllers/post');
const multer = require('../middlewares/multer-config');

//Posts
router.get('/', auth, postCtrl.getAllPost);
router.post('/', auth, multer, postCtrl.newPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.delete('/:id', auth, postCtrl.deleteOnePost);
router.put('/:id', auth, multer, postCtrl.modifyOnePost);
router.get('/user:id/posts', auth, postCtrl.getUserPosts);
router.get('/posts', auth, postCtrl.getAllPost);
//Commentaires
router.get('/:id/comments', auth, postCtrl.getAllComments);
router.post('/:id/comment/', auth, postCtrl.newComment);
router.delete('/comment/:id', auth, postCtrl.deleteComment);

module.exports = router;