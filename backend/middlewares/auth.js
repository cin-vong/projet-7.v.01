const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = (req, res, next) => {
    try {
        //On prend le token de la requete
        const token = req.headers.authorization.split(' ')[1];
        //Décodage via du TOKEN SECRET
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        // Extraction de l'user id du TOKEN
        const userId = decodedToken.userId;
        //Comparaison avec celui de la requete
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next(); //Middleware suivant
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};