const fetch = require('node-fetch');
const FormData = require('form-data');
const cheerio = require('cheerio');

module.exports = (url) => {
    const form = new FormData();
    form.append('url', url);
    form.append('dbs[]', 5);
    return fetch('https://saucenao.com/search.php', { method: 'POST', body: form }).then(res => res.text()).then(html => {
        const $ = cheerio.load(html);
        return $('.result').map(function () {
            const item = $(this)
            const linkify = $('.resultcontentcolumn .linkify', item).first()
            return {
                img: $('img', item).attr('src'),
                similarity: parseFloat($('.resultsimilarityinfo', item).text().replace(/[^0-9\.]/g, '')),
                title: $('.resulttitle', item).text(),
                id: linkify.text().replace(/[^0-9]/g, ''),
                url: linkify.attr('href')
            }
        }).get().filter(i => i.similarity)
    })
}