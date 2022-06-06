const  express = require('express')
const router = express.Router()
const Article = require('../models/ArticleSchema')


//localhost:PORT/articles
router.get('/', (req, res)=>{
    try{
        const articles =  Article.findAll()

        res.send(articles)
    } catch(error){
        console.error(error)
        res.send('something went wrong')
    }
})


//localhost:PORT/articles/:id
router.get('/:id', (req, res)=>{
    try{
        const {id} = req.params

        res.send(' single articles placed here')
    } catch(error){
        console.error(error)
        res.send('something went wrong')
    }
})




module.exports = router
