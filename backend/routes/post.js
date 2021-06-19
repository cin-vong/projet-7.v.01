const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const postCtrl = require('../controllers/post');

//Posts
router.get('/', auth, postCtrl.getAllPost);
router.post('/', auth, postCtrl.newPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.delete('/:id', auth, postCtrl.deleteOnePost);
router.put('/:id', auth, postCtrl.modifyOnePost);
router.get('/user:id/posts', auth, postCtrl.getUserPosts);
router.get('/posts', auth, postCtrl.getAllPost);
//Commentaires
router.get('/:id/comments', auth, postCtrl.getAllComments);
router.post('/:id/comment/', auth, postCtrl.newComment);
router.delete('/comment/:id', auth, postCtrl.deleteComment);

module.exports = router;