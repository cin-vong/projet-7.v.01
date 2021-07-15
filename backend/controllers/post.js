const dbParams = require("../database_connect");
const fs = require("fs");

//----------------------POSTS------------------------------------

// All post
exports.getAllPost = (req, res, next) => {
    dbParams.query('SELECT user.nom, user.prenom, posts.id, posts.userId, posts.title, posts.content, posts.image, posts.date AS date FROM user INNER JOIN posts ON user.id = posts.userId ORDER BY date DESC', (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
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

// NewPost
exports.newPost = (req, res, next) => {
     const thepost = {
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    dbParams.query("INSERT INTO posts SET ?" , thepost, (error, result) => {
        if (error) {
            console.log(error)
            return res.status(400).json ({ message: "Erreur interne" })
    }
        return res.status(201).json({ message: ' Votre message a bien été posté !'})
    })
};


// Delete OnePost
exports.deleteOnePost = (req, res, next) => { 
    const postId = req.params.id;
    dbParams.query('SELECT * FROM posts WHERE id=?', postId, (err, res) => {
        if (err) {
            console.log(err)
            return res.status(400).json("Erreur interne")
        } else {
            const imageResult = res;
            const filename = imageResult[0].image
            fs.unlink(`images/${filename}`,() => {
                dbParams.query('DELETE FROM posts WHERE id=?', postId, (error, res) => {
                    if(error){
                        console.log(error);
                        return res.status(400).json({ message : "Erreur interne "})
                    }
                })
            })
        }
    })
}
   
// Modify OnePost
exports.modifyOnePost = (req, res, next) => {
    const modifiyPost = {
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    dbParams.query(`UPDATE posts SET title = '${req.body.title}', content = '${req.body.content}', image = '${req.body.image}'  WHERE posts.id = ${req.params.id}`, modifiyPost, (error, result, field) => {
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

//----------------------COMMENTS------------------------------------

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
