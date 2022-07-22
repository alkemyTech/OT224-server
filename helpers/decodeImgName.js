const decodeImgName = ( file ) => {

   
    const result = file.name.split('.')
    const ext = result[result.length - 1]

    const decodedName = Buffer.from( result[0] , 'base64').toString('ascii');

    file['name'] = decodedName + '.' + ext;
    return file;
}

module.exports = {
    decodeImgName
}