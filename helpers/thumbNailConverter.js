const imageThumbnail = require('image-thumbnail');

const resizeImg = async ( img ) =>{

    const newBuffer = await imageThumbnail(img.tempFilePath)

    img['data'] = newBuffer;

    return img

}

module.exports = {
    resizeImg
}