const app = require('express')();
const cors = require('cors');
const proxy = require('express-http-proxy');
const fetch = require('node-fetch')
const NewsApi = require('newsapi')



const {CLIENT_ORIGIN, API_KEY} = require('./config');


app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
)



const newsapi = new NewsApi('a5b0fa76d282400d8c21da799e95fcd6');

app.get('/news', (req, res) => {
    newsapi.v2.everything({
        q: 'software-engineering',
        pageSize: 10,
        language: 'en',
    })
    .then(response => {
        console.log(response)
    })

})



app.get('/', (req, res) => {
    res.send('Hello, World!')
})

app.get('/api/news', (req, res) => {
    res.send('News')
    



    
})




const PORT = process.env.PORT || 3000;





app.listen(PORT, () => console.log(`Listening on PORT:${PORT}`))

module.exports = {app};