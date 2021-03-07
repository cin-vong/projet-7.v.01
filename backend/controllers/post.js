const dbParams = require('../dbParams');
const jwt = require('jsonwebtoken')
const fs = require('fs');

exports.createPost = (req, res, next) => {
    const attachementUrl = req.file.filename;
    const createPost = {
        authorname: req.body.authorname,
        authorid: req.body.authorid,
        title: req.body.title,
        content: req.body.content,
        attachement: attachementUrl
    }
    dbParams.query('INSERT INTO post SET ?', createPost, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message : "Erreur interne"})
        }
    return res.status(201).json({result, message: 'Votre message a bien été posté !' })
    })
};

exports.getOnePost = (req, res, next) => {
    const postId = req.params.id
    dbParams.query('SELECT * FROM post WHERE id="'+postId+'"', function(err,result){
      if (err){
          console.log(err);
          return res.status(400).json({ message : "Erreur interne" })
      }
      return res.status(201).json({ result })
  })
};

exports.getAllPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
    const userId = decodedToken.userId
    dbParams.query('SELECT * FROM post ORDER BY date DESC', [userId], (err, result) => {
        if(err) {
            console.log(err);
            return res.status(400).json({ message : "Erreur interne"})
        }
        return res.status(200).json({result});
    })
};

exports.deletePost = (req, res, next) => {
    const postId = req.params.id
    dbParams.query('SELECT * FROM post WHERE id=?', postId,(err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).json("Erreur interne")
        } else {
            const exportResult = result;
            const filename = exportResult[0].attachement
            fs.unlink(`images/${filename}`, () => {
                dbParams.query('DELETE FROM post WHERE id=?', postId, function(err,result){
                    if (err){
                        console.log(err);
                        return res.status(400).json({ message : "Erreur interne" })
                    } else {
                        dbParams.query('DELETE FROM comments WHERE postid=?', postId, function(err,result){
                            if (err){
                                console.log(err);
                                return res.status(400).json({ message : "Erreur interne" })
                            }
                            return res.status(201).json({message : 'Post supprimé avec ses commentaires'})
                        });
                    }
                })
            });
        }
    })
}