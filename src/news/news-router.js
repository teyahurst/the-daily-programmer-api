const path = require('path')
const express = require('express')
const NewsService = require('./news-service')

const NewsRouter = express.Router()
const jsonParser = express.json()

NewsRouter 
    .route('/')

    .get((req, res, next) => {
        NewsService.getAllNews(req.app.get('db'))
            .then(news => {
                res.json(news)
            })
            .catch(next) 
        })

    .post(jsonParser, (req, res, next) => {
        const { article_url, title, urltoimage, likes, dislikes, content } = req.body
        const newArticle = { article_url, title, urltoimage, likes, dislikes, content }
        const knexInstance = req.app.get('db')

        for ( const [key, value] of Object.entries(newArticle))
            if(value == null)
            return res.status(400).json({
                error: { message: `Missing '${key}' in request body` }
            })

    NewsService.insertArticle(knexInstance, newArticle)
            .then( article => {
                res.status(201)
                .json(article)
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { dislikes, likes, article_id } = req.body
        const articleToUpdate = { dislikes, likes, article_id }

        const numberOfValues = Object.values(articleToUpdate).filter(Boolean).length
        if(numberOfValues === 0)
            return res.status(400).json({
                error: {
                    message: `error: missing ${key} in values`
                }
            })

            NewsService.updateVote(
                req.app.get('db'),
                article_id,
                articleToUpdate
            )
            .then(numofRowsAffected =>{
                res.status(204).end()
            })
            .catch(next)
    })


module.exports = NewsRouter;