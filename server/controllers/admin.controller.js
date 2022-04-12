const bcrypt = require('bcrypt');
const {Admin} = require('./../models');
const {sendLink} = require('../service/mailService')
const {generateJwt} = require('../service/tokenService')
const uuid = require('uuid')



module.exports.registration = async (req, res, next) => { 
    try{
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({message: 'Incorrect'});
        }
        const candidate = await Admin.findOne({where: {email: `${email}`}})
        if (candidate) {
            return res.status(400).json({message: 'Пользователь с таким email уже существует'})
        }
        const hashPass = await bcrypt.hash(password, 2);
        const activationLink = uuid.v4();
        const admin = await Admin.create({email, password: hashPass, activationLink});
        await sendLink(email, `${process.env.MAIN_URL}api/activate/${activationLink}`);
        const token = generateJwt(admin.id, admin.email)
        return res.json({token})
    }    
    catch(e){
        console.log(e)
    }
}



module.exports.login = async (req, res, next) => {
    try{
        const {email, password} = req.body
        const user = await Admin.findOne({where: {email: `${email}`}})
        if (!user) {
            return res.status(400).json({message: 'Пользователь с таким email не найден'});
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return res.status(400).json({message: 'Неверный пароль'});
        }
        const token = generateJwt(user.id, user.email)
        return res.json({token, user: {id: user.id, email: user.email, isActivated: user.isActivated}})
    }
    catch(e){
        next(e)
    }
}



module.exports.check = async(req, res, next) => {
    try{
        await Admin.findOne({where: {email: `${req.user.email}`}})
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({token, user: {id: req.user.id, email: req.user.email}})
    }
    catch(e){
        next(e)
    }
}



module.exports.activate = async (req, res, next) => {
    try{
        const activationLink = req.params.link;
        const find = await Admin.findOne({where: {activationLink: `${activationLink}`}})
        if (!find){
            return res.status(400).json({message: 'Пользователь с таким email не найден'});
        }
        find.isActivated = true;
        console.log("Acticated")
        await find.save();
        return res.redirect(`${process.env.FRONT_URL}`);
    }
    catch(e){
        next(e)
    }
}

module.exports.refresh =async(req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        const userData = await userService.refresh(refreshToken);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(userData);
    } catch (e) {
        next(e);
    }
}