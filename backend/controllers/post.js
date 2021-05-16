const dbParams = require("../database_connect");
const multer = require("../middlewares/multer-config")

// All post
exports.getAllPost = (req, res, next) => {
    dbParams.query('SELECT user.nom, user.prenom, posts.id, posts.userId, posts.title, posts.content , posts.attachmentUrl, posts.date AS date FROM user INNER JOIN posts ON user.id = posts.userId ORDER BY date DESC', (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};
// NewPost
exports.newPost = (req, res, next) => {
    const fileName = multer.fileName;
    console.log(req.file);
     const thepost = {
         userId: req.body.userId,
         title: req.body.title,
         content: req.body.content,
         attachmentUrl: fileName, 
         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
     }
        
    dbParams.query('INSERT INTO posts SET ?', posts.title, posts.content, posts.attachmentUrl, thepost, (error, result) => {
        if (error) {
            console.log(error)
            return res.status(400).json ({ message: "Erreur interne" })
    }
        return res.status(400).json({ message: ' Votre message a bien été posté !'})
    })
};
// OnePost
exports.getOnePost = (req, res, next) => {
    dbParams.query(`SELECT * FROM posts WHERE posts.id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};
// Delete OnePost
exports.deleteOnePost = (req, res, next) => {
    dbParams.query(`DELETE FROM posts WHERE posts.id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};
// Modify OnePost
exports.modifyOnePost = (req, res, next) => {
    dbParams.query(`UPDATE posts SET title = '${req.body.title}', content = '${req.body.content}' WHERE posts.id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};
// Get User's Posts
exports.getUserPosts = (req, res, next) => {
    dbParams.query(`SELECT * FROM posts WHERE posts.userId = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};
// New comment
exports.newComment = (req, res, next) => {
    dbParams.query(`INSERT INTO comments VALUES (NULL, ${req.body.userId}, ${req.params.id}, NOW(), '${req.body.content}')`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};
// Get all comments
exports.getAllComments = (req, res, next) => {
    dbParams.query(`SELECT user.id, user.nom, user.prenom, comments.id,comments.content, comments.userId, comments.date FROM user INNER JOIN comments ON user.id = comments.userId WHERE comments.postId = ${req.params.id} ORDER BY comments.date DESC`,
        (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error
                });
            }
            return res.status(200).json(result);
        });
};
//Delete comment
exports.deleteComment = (req, res, next) => {
    dbParams.query(`DELETE FROM comments WHERE comments.id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};
