const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const passwordValidator = require('../middlewares/passwordValidator');

const userCtrl = require('../controllers/user');

router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;