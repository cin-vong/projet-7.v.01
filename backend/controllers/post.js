const fs = require("fs");

const dbParams = require("../database_connect");
// All post
exports.getAllPost = (req, res, next) => {
    dbParams.query('SELECT user.nom, user.prenom, posts.id, posts.userId, posts.title, posts.content,posts.attachement, posts.date AS date FROM user INNER JOIN posts ON user.id = posts.userId ORDER BY date DESC', (error, result, field) => {
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
    dbParams.query(`INSERT INTO posts VALUES (NULL, '${req.body.userId}', '${req.body.title}', NOW(), '${req.body.content}', '${req.body.attachement}')`, (error, result, field) => {
        const posts = new posts({
            ...dbParams,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          });
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(201).json({
            message: 'Votre post à été publié !'
        })
    });
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
    const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        dbParams.deleteOne({ _id: req.params.id })
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
    })
};
// Modify OnePost
exports.modifyOnePost = (req, res, next) => {
    dbParams.query(`UPDATE posts SET title = '${req.body.title}', content = '${req.body.content}' attachement = '${req.body.attachement}' WHERE posts.id = ${req.params.id}`, (error, result, field) => {
        const dbParams = req.file ?
    {
      ...JSON.parse(req.body.attachement),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    attachement.updateOne({ _id: req.params.id }, { ...dbParams, _id: req.params.id })
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
    dbParams.query(`INSERT INTO comments VALUES (NULL, ${req.body.userId}, ${req.params.id}, NOW(), '${req.body.content}' '${req.body.attachement}')`, (error, result, field) => {
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
    dbParams.query(`SELECT user.id, user.nom, user.prenom, comments.id,comments.content, comments.attachement, comments.userId, comments.date FROM user INNER JOIN comments ON user.id = comments.userId WHERE comments.postId = ${req.params.id} ORDER BY comments.date DESC`,
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
