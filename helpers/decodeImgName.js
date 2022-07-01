

const decodeImgName = ( file ) => {

    const decodedName = Buffer.from( file.name , 'base64').toString('ascii');
    file['name'] = decodedName

    return file;
}

module.exports = {
    decodeImgName
}