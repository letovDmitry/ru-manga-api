const express = require('express')
const parser = require('./parser')
const bodyParser = require('body-parser')
const app = express()
const port = 3001 || process.env.PORT

app.use(bodyParser());

app.get('/get_popular_manga', (req, res) => {
    parser.getPopularMangaList(req.query.page).then(i => {
        res.json({
            data: i
        })
    }).catch(e => {
        res.json({
            e
        })
    })
})

app.post('/get_manga_by_name', (req, res) => {
    parser.getMangaByName(req.body.name).then(i => {
        res.json({
            data: i
        })
    }).catch(e => {
        res.json({
            e
        })
    })
})

app.post('/get_manga_by_link', (req, res) => {
    parser.getMangaByLink(req.body.link).then(i => {
        res.json({
            data: i
        })
    }).catch(e => {
        res.json({
            e
        })
    })
})

app.post('/get_pages', (req, res) => {
    parser.getAllPages(req.body.link).then(i => {
        res.json({
            data: i
        })
    }).catch(e => {
        res.json({
            e
        })
    })
})

app.listen(port, () => {
  console.log(`listening`)
})