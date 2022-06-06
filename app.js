const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({extended:true}))

app.use(express.json())

// const get_gif = async (wSearch)=>{
    
//     const api_key = 'grfrX5zkJtN2lUpb0RLNRAN1c82Me0Qc'
//     let searQ = wSearch.trim()
//     const api_url = `http://api.giphy.com/v1/gifs/search?q=${searQ}&api_key=${api_key}&limit=1`
    
//     const resp = await fetch(api_url)
//     const api_data = await resp.json()
//     const {data} = api_data
    
//     console.log(data[0].images.original.url);
//     // .images.original.url
// }


//localhost:PORT
app.get('/', (req, res)=>{
    // res.send('/ page loaded')
    res.send(get_gif('dragon'))
    
})

//localhost:PORT/articles
app.get('/articles', (req, res)=>{
    res.send(' all articles placed here')
})

//localhost:PORT/articles/:id
app.get('/articles/:id', (req, res)=>{
    res.send('/:id separate articles')
})



module.exports = app

