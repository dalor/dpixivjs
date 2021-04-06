const fs = require('fs');
const PNG = require('pngjs').PNG;

const renderData = (obj) => (new Buffer.from(JSON.stringify(obj))).toString('base64')

const b64str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

module.exports = (data) => {

    const str = renderData(data)

    const length = str.length

    const size = Math.floor(Math.sqrt(length / 4)) + 1

    console.log(length, size)

    const png = new PNG({
        width: size,
        height: size,
    });

    const getID = (idx) => {
        if (idx < length) {
            return b64str.indexOf(str[idx])
        } else {
            return 255
        }
    }

    for (let y = 0; y < png.height; y++) {
        for (let x = 0; x < png.width; x++) {
            const idx = (png.width * y + x) << 2;
            png.data[idx] = getID(idx);
            png.data[idx + 1] = getID(idx + 1);
            png.data[idx + 2] = getID(idx + 2);
            png.data[idx + 3] = getID(idx + 3);
        }
    }
    return png.pack()
}