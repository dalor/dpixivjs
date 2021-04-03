const fixChars = (str) => str.replace('<', '&#60;').replace('>', '&#62;')

exports.fixChars = fixChars

const changePage = (url, page) => url.replace(/\_p[0-9]+/, `_p${page}`)

exports.changePage = changePage

exports.returnToHtml = (caption, caption_entities) => {
    let res = ""
    let end_other = 0
    for (entity of caption_entities) {
        res += caption.slice(end_other, entity.offset)
        end_other = entity.offset + entity.length
        let text = fixChars(caption.slice(entity.offset, end_other))
        if (entity.type === "text_link") {
            res += `<a href=\"${entity.url}\">${text}</a>`
        } else
            if (entity.type === "bold") {
                res += `<b>${text}</b>`
            }
            else
                if (entity.type === "code") {
                    res += `<code>${text}</code>`
                }
                else
                    if (entity.type === "italic") {
                        res += `<i>${text}</i>`
                    } else {
                        res += text
                    }
    }
    res += caption.slice(end_other, caption.length)
    return res
}

exports.originalToRegular = (url, page) => {
    const new_url = url.replace('img-original', 'img-master').replace('.png', '.jpg')
    if (new_url.match(/.+\_ugoira0/)) {
        return new_url.replace('_ugoira0', '_master1200')
    }
    else {
        return changePage(new_url, `${page}_master1200`)
    }
}