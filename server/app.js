const express = require('express');
const postsRouter = require('./Routers/postsRouter');
const adminRouter = require('./Routers/adminRouter')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const app = express();
const parseRss = require('./service/rssParserCron')


app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    response.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE, OPTIONS");
    response.header("Access-Control-Allow-Credentials", "true");
    next();
  });

app.use(express.json());
app.use(cookieParser());
app.use('/api', postsRouter);
app.use('/api', adminRouter);
app.use(function () {
  parseRss
});

app.use(cors({
    origin:'*',
    credentials: true
  }));

module.exports = app;


