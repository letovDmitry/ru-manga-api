const cheerio = require('cheerio')
const axios = require('axios')
const convert = require('./convert')

getMangaCover = chapters => {
    return Parser.getAllPages(chapters[chapters.length - 1].link).then(i => i[0])
}

const Parser = {    
    getMangaByName: async (name) => {
        const { data } = await axios.get(`https://readmanga.io/${convert.convert(name)}`)
        
        const $ = cheerio.load(data)

        const links = []

        $('table tr td a').each((i, e) => {
            links.push($(e).attr('href').slice(1))
        })

        const chapters = links.map(i => {return { number: i.match(/[/][\s\S]*$/)[0].slice(1).replace('vol', '').replace('/', ' - '), link: `https://readmanga.io//${i}` }})

        let cover = await getMangaCover(chapters).then(i => i)

        const manga = {
            title: $('span.name').text(),
            genres: $('.elem_genre').text(),
            author: $($('a.person-link').toArray()[0]).text(),
            cover,
            description: $($('.manga-description').toArray()[0]).text(),
            chapters: chapters
        }

        return manga
    },
    getMangaByLink: async (link) => {
        const { data } = await axios.get(link)
        
        const $ = cheerio.load(data)

        const links = []

        $('table tr td a').each((i, e) => {
            links.push($(e).attr('href').slice(1))
        })

        const chapters = links.map(i => {return { number: i.match(/[/][\s\S]*$/)[0].slice(1).replace('vol', '').replace('/', ' - '), link: `https://readmanga.io//${i}` }})

        let cover = await getMangaCover(chapters).then(i => i)

        const manga = {
            title: $('span.name').text(),
            genres: $('.elem_genre').text(),
            author: $('a.person-link').text(),
            cover,
            description: $($('.manga-description').toArray()[0]).text(),
            chapters: chapters
        }

        return manga
    },
    getAllPages: async (link) => {
        const { data } = await axios.get(link)
        const $ = cheerio.load(data)

        const pages = JSON.parse(data.slice(data.indexOf('rm_h.init') + 24, data.indexOf(']]', data.indexOf('rm_h.init')) + 2).replace(/'/gm, `"`))

        const pagesURLs = pages.map(element => {
            const el = element.filter(x => isNaN(x))
            return el[0] + el[1]
        });

        return pagesURLs
    },
    async getPopularMangaList (page = 1) {
        const { data } = await axios.get(`https://readmanga.io/list?sortType=USER_RATING&offset=${(page - 1) *70}`) //&offset=70
        const $ = cheerio.load(data)
        
        const titles = []

        $('.tile.col-md-6 h3 a').each((i, e) => {
            titles.push($(e).text())
        })

        return titles
    }
}

module.exports = Parser

