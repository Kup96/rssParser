let cron = require('node-cron');
let Parser = require('rss-parser');
let {postsController} = require('../controllers/index')
let parser = new Parser({timeout: 5000,});
let reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.,_\+~#=]{1,512}\.[a-zA-Z0-9()]{1,15}\b([-a-zA-Z0-9()!@:,%_\+.~#?&\/\/=]*)/gm
let image;

module.exports.parseRss = cron.schedule('* * * * *', () => {
    console.log('===========================\nParsing RSS:\n=========================== ');
    (async () => {
        let feed = await parser.parseURL('https://lifehacker.com/rss');
        feed.items.forEach(item => {
        image = item.content.match(reg)[0];
        postsController.push({body: {title: `${item.title}`, link: `${item.link}`, rssDate: `${item.pubDate}`, image: `${image}`}})
  });
})();  
});
