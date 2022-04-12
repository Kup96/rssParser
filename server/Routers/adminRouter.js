const { Router } = require('express');
const { adminController } = require('../controllers');
const adminRouter = Router();
const {auth} = require('../middleware/auth.middleware')


adminRouter.post('/registration', adminController.registration);
adminRouter.post('/login', adminController.login);
adminRouter.get('/activate/:link', adminController.activate);
adminRouter.get('/check', auth, adminController.check);



module.exports = adminRouter;