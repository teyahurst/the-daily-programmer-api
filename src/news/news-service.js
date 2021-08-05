

const NewsService = {
    getAllNews(knex){
        return knex.select('*').from('articles')
    },
    insertArticle(knex, newArticle) {
        return knex 
            .insert(newArticle)
            .into('articles')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    updateVote(knex, article_id, newArticleField) {
        if(!article_id){
            throw new Error('article_id')
        }
        return knex
            .from('articles')
            .where({ article_id })
            .update(newArticleField)
    }
}

module.exports = NewsService