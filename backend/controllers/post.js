const dbParams = require("../database_connect");
const fs = require("fs");

// All post
exports.getAllPost = (req, res, next) => {
    dbParams.query('SELECT user.nom, user.prenom, posts.id, posts.userId, posts.title, posts.content, posts.date AS date FROM user INNER JOIN posts ON user.id = posts.userId ORDER BY date DESC', (error, result, field) => {
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
    const filename = req.file;
    console.log("Image", filename);
    if(req.file !=null && req.file.filename !=null) {
     filename = req.file.filename
    }
    console.log(req.file);
    console.log(req.body);
    // req.body.data = JSON.parse(req.body.data)//transforme le json en object 
     const thepost = {
         userId: req.body.userId,
         title: req.body.title,
         content: req.body.content,
         image: filename`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
     }
        
    dbParams.query('INSERT INTO posts (userId, title, content, image) VALUE(?,?,?)', [userId, title, content, image], thepost, (error, result) => {
        if (error) {
            console.log(error)
            return res.status(400).json ({ message: "Erreur interne" })
    }
        return res.status(201).json({ message: ' Votre message a bien été posté !'})
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
    let imageFilename = req.file;;
    dbParams.query('SELECT * FROM posts WHERE posts.id = ? ', [posts.id], function (err, result) {
    if (result > 0) {
        const filename = result[0].image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => { // On supprime le fichier image 
            imageFilename = "DELETE FROM Post WHERE userId = ? AND posts.id  = ?"
            });
        }
    dbParams.query(`DELETE FROM posts WHERE posts.id = ${req.params.id}`, (error, result, field) => {
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
    const filename = req.file;
    console.log("ICI", filename);
    if(req.file !=null && req.file.filename !=null) {
     filename = req.file.filename
    }
    console.log(req.file);
    console.log(req.body);
    // req.body.data = JSON.parse(req.body.data)//transforme le json en object 
     const Modifydata = {
         userId: req.body.userId,
         title: req.body.title,
         content: req.body.content,
         image: filename`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
     }
    dbParams.query(`UPDATE posts SET title = '${req.body.title}', content = '${req.body.content}' WHERE posts.id = ${req.params.id}`, Modifydata, (error, result, field) => {
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
