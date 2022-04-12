const { Router } = require('express');
const postsRouter = require('./Routers/postsRouter');
const adminRouter = require('./Routers/adminRouter');
const router = Router();
router.use('/admin', postsRouter);
router.use('/admin', adminRouter);
module.exports = router;