const { posts } = require('./../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports.push = async (req, res, next) => {
    const { title, link, rssDate, image} = req.body;
    try {
        const find = await posts.findOne({where:{link: `${link}`}})
        if (!find) {
          const pushedPost = await posts.create({title, link, rssDate, image});
            if (pushedPost){
              console.log('Новая новость добавлена в базу');}
        }else {
          return console.log('Новость уже есть в базе');}
    }catch(e){
          console.log(e)
        }
}

module.exports.pushPost = async (req, res, next) => {
  const { title, link, image } = req.body.data;
  console.log(image)
  try {
      const find = await posts.findOne({where:{link: `${link}`}})
      if (!find) {
        const pushedPost = await posts.create({title, link, image});
        console.log(image)
          if (pushedPost){
            return res.status(200).send(pushedPost)}
      }else {
        return console.log('Новость уже есть в базе');}
  }catch(e){
        console.log(e)
      }
}

module.exports.parseAllPosts = async (req, res)=>{
    try{
        let allPosts
        if (req.query.title){
          allPosts = await posts.findAll({ where: {title: {[Op.like]: `%${req.query.title}%`},}, 
          limit: 3, 
          offset: (req.query.pageId-1)*3,
          order: [
            ['rssDate', `${req.query.sort}`]]})
          
          }else{
            allPosts = await posts.findAll({limit: 3, offset: (req.query.pageId-1)*3, order: [
              ['rssDate', `${req.query.sort}`]]})
          }
        if(allPosts){
            return res.status(200).send(allPosts)
        }
    }catch(e){
        if (e.name == 'TypeError'){
          next()
        }
    }
}


module.exports.editPost = async (req, res, next) => {
    try {
      const id = req.params;
      if(!id){
        res.status(400).console.log('No Id')
      }
      console.log(req.params.id)
      console.log(req.body)
      const updateInfo = await posts.update(req.body, {
        where: {
          id: req.params.postId,
        }
      });
      if (updateInfo) {
        return res.status(201).send(updateInfo);
      }
      return next(new Error());
    } catch (e) {
      next(e);
    }
  };

  module.exports.deletePost = async (req, res, next) => {
    try {
      const foundPost = await posts.destroy({
        where: {
          id: req.params.postId,
        },
      });
      if (foundPost) {
        return res.status(201).send('Deleted');
      }
      return next(new Error());
    } catch (e) {
      next(e);
    }
  };


