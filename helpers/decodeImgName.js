const decodeImgName = ( file ) => {

   
    const [ imgName, ext ] = file.name.split('.')
    const decodedName = Buffer.from( imgName , 'base64').toString('ascii');
    file['name'] = decodedName + '.' + ext;

    return file;
}

module.exports = {
    decodeImgName
}