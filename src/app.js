require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const NewsApi = require('newsapi');
const NewsRouter = require('./news/news-router')
const fetch = require('node-fetch')

const { NODE_ENV, API_KEY } = require('./config.js');
const NewsAPI = require('newsapi');

const app = express();

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.get('/news', (req, res, next) => {
    const newsapi = new NewsAPI(API_KEY);

    newsapi.v2.everything({
        q: 'software-engineering',
        language: 'en', 
        pageSize: 10,
    })

    

.then(data=> {
    res.json(data)

    for(let i = 0; i < data.articles.length; i++){


        const articles = {
          article_url: data.articles[i].url,
          title: data.articles[i].title,
          urltoimage: data.articles[i].urlToImage,
          likes: 0,
          dislikes: 0,
          content: data.articles[i].description,

        }


        fetch('http://localhost:8000/articles', {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(articles)


            })
        }
    })
    .catch(next)
})


app.use('/articles', NewsRouter)


app.use(function errorHandler(error, req, res, next){
    let response 
    if(NODE_ENV === 'production'){
        response = { error: { message: 'server error'}}
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app;