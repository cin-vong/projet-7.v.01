const pwdRouter = require('../passwordValidator');

module.exports = (req, res, next)=>{
    if( ! pwdRouter.validate(req.body.password)){
        return res.status(404).json({ error:'Mot de passe invalide !'});
    }else{
        next();
    }
}