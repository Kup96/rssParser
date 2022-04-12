const { Router } = require('express');
const { postsController } = require('../controllers');
const postsRouter = Router();
const {auth} = require('../middleware/auth.middleware')

postsRouter.post('/posts', postsController.push);
postsRouter.post('/posts', auth, postsController.pushPost);
postsRouter.get('/posts/', auth, postsController.parseAllPosts);
postsRouter.put('/posts/:postId', auth, postsController.editPost);
postsRouter.delete('/posts/:postId', auth, postsController.deletePost);


module.exports = postsRouter;